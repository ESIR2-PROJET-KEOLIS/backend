import { Body, Controller, Get, HttpException, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Bus } from './bus.entity';
import { BusService } from './bus.service';



@Controller('bus')
export class BusController {

    constructor(private service: BusService){}

    @Get()
    getAll(): Bus[]{   
        return this.service.getAll();
    }
  
    @ApiTags('Get')
    @Get(':id')
    getById(@Param() parametre): Bus{  
      let busId = this.service.getById(+parametre.id);
      if(busId === undefined || busId === null){
        throw new HttpException('Could not find a user with the id ${parametre.id}', 404);
      }
      return busId;
    }

  @ApiTags('Création')
  @Post()
  @ApiCreatedResponse({description: 'The user has been successfully created.'})
  create(@Body() input: any): Bus {
    return this.service.create(input.ligne,input.longitude,input.latitude);
  }
}
