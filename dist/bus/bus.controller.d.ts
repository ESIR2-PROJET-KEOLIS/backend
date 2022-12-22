import { Bus } from './bus.entity';
import { BusService } from './bus.service';
export declare class BusController {
    private service;
    constructor(service: BusService);
    getAll(): Bus[];
    getById(parametre: any): Bus;
    create(input: any): Bus;
}
