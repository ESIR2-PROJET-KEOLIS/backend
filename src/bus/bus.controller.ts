import { Body, Controller, Get, HttpException, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Bus } from './bus.entity';
import { BusService } from './bus.service';



@Controller('bus')
export class BusController {

  constructor(private service: BusService){}
  
  @ApiTags('Création')
  @Post()
  @ApiCreatedResponse({description: 'The user has been successfully created.'})
  async create(@Body() input: any): Promise<Bus> {
    return this.service.create(input.ligne,input.longitude,input.latitude);
  }

}
