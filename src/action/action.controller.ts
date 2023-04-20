import { Controller, Get, Param } from '@nestjs/common';
import { ActionService } from './action.service';

@Controller('action')
export class ActionController {

    constructor(private service: ActionService){}
  
    @Get('color/line/')
    async getLineColor(): Promise<any>{   
        return this.service.getAllLineColor();
    }

    @Get('station/bus')
    async getBusStation(): Promise<any>{   
        return this.service.getAllBusStation();
    }

    @Get('picto/bus')
    async getBusPicto(): Promise<any>{   
        return this.service.getAllBusPicto();
    }

    @Get('location/bus/:day/:hour/:minute')
    async getBusAnyTimeLocationTime(@Param() parametre): Promise<any>{   
        return this.service.getAllBusLocationTime(parametre.day,parametre.hour,parametre.minute);
    }

    @Get('station/metro')
    async getAllMetroStation(): Promise<any>{   
      return this.service.getAllSubwayStation();
    }

}
