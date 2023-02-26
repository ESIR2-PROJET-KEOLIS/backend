import { Injectable } from '@nestjs/common';
import { Bus } from "../bus/bus.entity";

@Injectable()
export class LinesService {

  getAll():any[]{
    return [];
    //return this.repository.find();
  }

}
