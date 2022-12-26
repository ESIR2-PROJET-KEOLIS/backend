import { Bus } from './bus.entity';
export declare class BusService {
    constructor();
    create(Newligne: string, longitude: number, latitude: number): Bus;
    getById(idBus: number): Bus;
    getAll(): Bus[];
}
