import { Injectable } from '@nestjs/common';
import { Bus } from './bus.entity';
import { Position } from '../position/position.entity';

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
}
