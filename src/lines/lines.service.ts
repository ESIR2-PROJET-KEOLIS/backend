import { Injectable } from '@nestjs/common';
import * as process from "process";
import axios from "axios";

@Injectable()
export class LinesService {

  async getAll(lines: string[]){
    // let baseURL = (/*process.env.API_PROCESSUNIT ||*/ 'http://localhost:8090')+"/optimizedpath?line=";
    let baseURL = 'http://processingunit:8090/optimizedpath?line=';
    let urls: string[] = [];
    lines.forEach(line => {
      urls.push(baseURL+line+"&sens=0");
      urls.push(baseURL+line+"&sens=1");
    });

    const requests = urls.map((url) => axios.get(url));

    const response = await axios.all(requests);

    let list = response.map((resp) => {
      let urlreq = resp.config.url;
      let liner = urlreq.split("line=")[1].split("&")[0];
      let sensr = urlreq.split("sens=")[1];
      let res = {};
      res[liner+"_"+sensr] = resp.data;
      return res;
    });

    return list.reduce(((obj1, obj2) => Object.assign(obj1, obj2)), {})
  }

}
