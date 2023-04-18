import { Injectable } from '@nestjs/common';
import { Pictogramme } from './Pictogrammme.entity';
import { Arret } from './arret.entity';
import { Position } from 'src/position/position.entity';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import * as process from "process";
import axios from "axios";
import { escape } from 'mysql';



const busStation : Arret[] = [];
const PictoBus : Pictogramme[] = [];
const MetroStation : Arret[] = [];

let baseURL = (process.env.API_PROCESSUNIT || 'http://localhost:8090');
let lines = ['10', '11', '12', '13', '14', '226', '32', '34', '39', '50', '51', '52', '53', '54', '55', '56', '59', '61', '62', '64', '65', '67', '68', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '91', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7']


@Injectable()
export class ActionService {

    
    constructor(private readonly httpService: HttpService) {}

    async getAllBusLocationTime(day:string, hours:number, minutes:number): Promise<any> {
        day = escape(day);
        hours = escape(hours);
        minutes = escape(minutes);
        /*if(hours >= 0 && hours<= 8){
            hours = hours + 24;
        }*/
        let id = 0;
        let urls: string[] = [];
        lines.forEach(line => {
            urls.push(baseURL+'/theoricposition?line='+line+'&hour='+hours+':'+minutes+':00&day='+day);
        });
        const requests = urls.map((url) => axios.get(url));

        const response = await axios.all(requests);

        let list = response.map((resp) => {
            let urlreq = resp.config.url;
            let liner = urlreq.split("line=")[1].split("&")[0];
            let res = [];
            res[liner] = resp.data;
            id++;
            return res;
        });
        
        return list.reduce(((obj1, obj2) => Object.assign(obj1, obj2)), {})
    }

    async getAllLineColor(): Promise<any> {
        let retourLineColor: any[] = [];
        for (const line of lines) {
            const response: AxiosResponse<any> = await this.httpService.get(baseURL+'/linecolor?line='+line).toPromise();
            const lineColor = response['data'];
            retourLineColor.push({ line, lineColor });
        }
        return retourLineColor;
    }
   
    async getAllBusPicto(): Promise<any[]>{
        const fs = require("fs");
        
        const file = fs.readFileSync("./src/action/tco-bus-lignes-pictogrammes-dm.json");
        const data = JSON.parse(file.toString());
        
        for (const item of data) {
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

    // retourne l'ensemble des stations de bus
    async getAllBusStation(): Promise<Arret[]>{
        const fs = require("fs");
        
        const file = fs.readFileSync("./src/action/tco-bus-topologie-pointsarret-td.json");
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
}
