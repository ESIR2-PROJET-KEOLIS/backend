import { Injectable } from '@nestjs/common';
import { Bus } from "../bus/bus.entity";
import process from "process";
import axios from "axios/index";

@Injectable()
export class LinesService {

  async getAll(lines: string[]){
    let baseURL = (process.env.API_PROCESSUNIT || 'http://localhost:8090')+"/optimizedpath";

    const response = await axios.get(baseURL, { params: { bus: lines } });

    console.log(response.data);

    return [];
  }

}
