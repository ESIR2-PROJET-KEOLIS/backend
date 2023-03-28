import { Body, Controller, Get, HttpException, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Bus } from './bus.entity';
import { BusService } from './bus.service';



@Controller('bus')
export class BusController {

  constructor(private service: BusService){}


  @Get('station/bus')
  async getBusStation(): Promise<any>{   
    return this.service.getAllBusStation();
  }

  @Get('station/metro')
  async getAllMetroStation(): Promise<any>{   
    return this.service.getAllSubwayStation();
  }

  @Get('picto/bus')
  async getBusPicto(): Promise<any>{   
    return this.service.getAllBusPicto();
  }

  @Get('horraires/:jours/:heure/:minutes')
  async getBusDay(@Param() parametre): Promise<Bus[]>{
    return this.service.getBusDay(parametre.jours,parametre.heure,parametre.minutes);
  }

  /*@ApiTags('Get')
  @Get(':id')
  getById(@Param() parametre): Bus{  
    let busId = this.service.getById(+parametre.id);
    if(busId === undefined || busId === null){
      throw new HttpException('Could not find a user with the id ${parametre.id}', 404);
    }
    return busId;
  }

  @Get(':id')
  async getById(@Param() parametre): Promise<any>{  
    //let busId = this.service.getById(+parametre.id);
    //if(busId === undefined || busId === null){
      //throw new HttpException('Could not find a user with the id ${parametre.id}', 404);
    //}
    return this.service.getRealTimeBus();
  }*/

  @ApiTags('Création')
  @Post()
  @ApiCreatedResponse({description: 'The user has been successfully created.'})
  async create(@Body() input: any): Promise<Bus> {
    return this.service.create(input.ligne,input.longitude,input.latitude);
  }

  

}
