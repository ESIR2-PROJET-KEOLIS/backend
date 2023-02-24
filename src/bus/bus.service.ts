import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Bus } from './bus.entity';
import { Position } from '../position/position.entity';
import { Arret } from './arret.entity';
import { Pictogramme } from './Pictogrammme.entity';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';
import { IORedisKey } from '../redis.modules';

let positionTest = new Position();
positionTest.SetPosition(12,35);
let id : number = 0;

const buss : Bus[] = [
    {
        id: 0,
        ligne: 'C1',
        position: positionTest.GetPosition()
    },
    {
        id: 1,
        ligne: 'C2',
        position: positionTest.GetPosition()
    },
    {
        id: 2,
        ligne: 'C3',
        position: positionTest.GetPosition()
    },
    {
        id: 3,
        ligne: 'C4',
        position: positionTest.GetPosition()
    },
]
const busStation : Arret[] = [];
const MetroStation : Arret[] = [];
const PictoBus : Pictogramme[] = [];

@Injectable()
export class BusService {
    constructor(
        //@InjectRepository(User)
        //private repository: Repository<User>,
        @Inject(IORedisKey) private readonly redisClient: Redis,
    ){}

    async addRedis(data:any){
        try {
            await this.redisClient
            .multi([['send_command', 'JSON.SET', id, '.', JSON.stringify(data)]]).exec();
            id++;
            return data;
        } catch (e) {
            console.log("Erreur dans l'ajout");
        throw new InternalServerErrorException();
        }
    }

    async create(Newligne: string, longitude:number, latitude:number): Promise<Bus> {

        let newBus = new Bus();
        let newPos = new Position();
        newPos.SetPosition(longitude,latitude);
        newBus.ligne=Newligne;
        newBus.position=newPos;
        try {
            await this.redisClient
            .multi([['send_command', 'JSON.SET', newBus.id, '.', JSON.stringify(newBus)]]).exec();
            return newBus;
        } catch (e) {
            console.log("Erreur dans l'ajout");
        throw new InternalServerErrorException();
        }
        //return newBus;
    }

    /*async createBis():Promise<Bus>{
        let busN = new Bus();
        let positionTest = new Position();
        positionTest.SetPosition(12,35);

        busN.ligne = "C1";
        busN.id=1;
        busN.position= positionTest;
        try {
        await this.redisClient
            .multi([['send_command', 'JSON.SET', busN.id, '.', JSON.stringify(busN)]]).exec();
            return busN;
        } catch (e) {
            console.log("Erreur dans l'ajout");
        throw new InternalServerErrorException();
        }
    }*/

    async getById(id:number):Promise<Bus>{
        let busN = new Bus();
        try {
            const busString = await this.redisClient
            .multi([['send_command', 'JSON.GET', id, '.']]).exec(); 

            let obj: unknown = busString[0][1];

            if (typeof obj === 'string') {
                let str = obj as string;
                const data = JSON.parse(str);
                return data;
            }            
        } catch (e) {
            console.log("Bus inexistant");
            throw new InternalServerErrorException(`Failed to get Bus ${id}`);
        }
    }

    getAll():Bus[]{
        return buss;
        //return this.repository.find();
    }


    async getAllSubwayStation():Promise<Arret[]>{
        const fs = require("fs");
        
        const file = fs.readFileSync("./src/bus/tco-metro-topologie-stations-td.json");
        const data = JSON.parse(file.toString());
        
        for (const item of data) {
            let newStation = new Arret();
            let positionTest = new Position();
            positionTest.SetPosition(item.coordonnees.lon,item.coordonnees.lat);

            newStation.name=item.nom;
            newStation.position=positionTest;
            MetroStation.push(newStation);
        }
        
        return MetroStation;
    }

    // retourne l'ensemble des stations de bus
    async getAllBusStation(): Promise<Arret[]>{
        const fs = require("fs");
        
        const file = fs.readFileSync("./src/bus/tco-bus-topologie-pointsarret-td.json");
        const data = JSON.parse(file.toString());
        
        for (const item of data) {
            //console.log(item.nom);
            let newStation = new Arret();
            let positionTest = new Position();
            positionTest.SetPosition(item.coordonnees.lon,item.coordonnees.lat);

            newStation.name=item.nom;
            newStation.position=positionTest;
            busStation.push(newStation);
        }
        
        return busStation;
    }

    getBusDay(days:number,hours:number,minutes:number): Bus[]{
        let buscirculating : Bus[];
        // Parcours du fichier

        // Si le jours corresponds au parametre et l'heure et la minutes coresspondent
        // Ajout dans un tableau

        // retourner le tableau

        return buscirculating;
    }

    async getAllBusPicto(): Promise<any[]>{
        const fs = require("fs");
        
        const file = fs.readFileSync("./src/bus/tco-bus-lignes-pictogrammes-dm.json");
        const data = JSON.parse(file.toString());
        
        for (const item of data) {
            //console.log(item.nom);
            let newPicto = new Pictogramme();
            
            newPicto.nomLigne = item.nomcourtligne;
            newPicto.nomImage = item.image.filename;
            newPicto.format = item.image.format;
            newPicto.width = item.image.width;
            newPicto.height = item.image.height;

            PictoBus.push(newPicto);
        }

        return PictoBus;
    }

    
}

