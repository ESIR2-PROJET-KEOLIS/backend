import { Injectable } from '@nestjs/common';
import * as process from "process";
import axios from "axios";

@Injectable()
export class LinesService {

  async getAll(lines: string[]){
    let baseURL = (process.env.API_PROCESSUNIT || 'http://localhost:8090')+"/optimizedpath?line=";
    let urls: string[] = [];
    lines.forEach(line => {
      urls.push(baseURL+line+"&sens=0");
      urls.push(baseURL+line+"&sens=1");
    });

    const requests = urls.map((url) => axios.get(url));

    const response = await axios.all(requests);

    return response.map((resp) => resp.data);
  }

}
