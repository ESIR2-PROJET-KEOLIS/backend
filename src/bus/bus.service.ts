import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Bus } from './bus.entity';
import { Position } from '../position/position.entity';
import { Arret } from './arret.entity';
import { Redis } from 'ioredis';
import { IORedisKey } from '../redis.modules';
import { escape } from 'mysql';


let idKey =0;
@Injectable()
export class BusService {
    
    constructor(
        @Inject(IORedisKey) private readonly redisClient: Redis,
    ){}

    async addRedis(data:any):Promise<any[]>{
        try {
            await this.redisClient.multi().set(`${idKey}`, JSON.stringify(data)).exec();
            idKey++;
            return data;
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException();
        }
    }

    async create(Newligne: string, longitude:number, latitude:number): Promise<Bus> {
        Newligne = escape(Newligne);
        longitude = escape(longitude);
        latitude = escape(latitude);
        let newBus = new Bus();
        let newPos = new Position();
        newPos.SetPosition(longitude,latitude);
        newBus.ligne=Newligne;
        newBus.position=newPos;
        try {
            await this.redisClient.multi([['send_command', 'JSON.SET', newBus.id, '.', JSON.stringify(newBus)]]).exec();
            return newBus;
        } catch (e) {
            console.log("Erreur dans l'ajout");
        throw new InternalServerErrorException();
        }
        //return newBus;
    }

    async getRealTimeBus():Promise<{features:any[]}[]>{
        try {
            const value = await this.redisClient.get("0");
            const data = JSON.parse(value);
            
            return data;
        } catch (e) {
            console.log("Bus inexistant");
            throw new InternalServerErrorException(`Failed to get Bus}`);
        }
    }
}

