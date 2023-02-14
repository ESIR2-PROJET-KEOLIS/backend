import { Injectable } from '@nestjs/common';
import { Bus } from './bus.entity';
import { Position } from '../position/position.entity';
import { Arret } from './arret.entity';
import { Pictogramme } from './Pictogrammme.entity';

let positionTest = new Position();
positionTest.SetPosition(12,35);

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
        
    ){}

    create(Newligne: string, longitude:number, latitude:number): Bus {

        let newBus = new Bus();
        let newPos = new Position();
        newPos.SetPosition(longitude,latitude);
        newBus.ligne=Newligne;
        newBus.position=newPos;
        buss.push(newBus);

        return newBus;
    }

    getById(idBus:number): Bus{
        for (const bus of buss) {
            if(bus.id===idBus){
                return bus;
            }
        }
        //return this.repository.findOneBy({id:(idU)});
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
