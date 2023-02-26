import { Body, Controller, Get } from "@nestjs/common";
import { LinesService } from "./lines.service";
import axios, { AxiosError } from "axios";
import * as process from "process";

@Controller('lines')
export class LinesController {

  constructor(private service: LinesService){}

  @Get()
  getAll(@Body() lines: string[]): any{
    let baseURL = (process.env.API_PROCESSUNIT || 'http://localhost:8090')+"/optimizedpath?line=";
    console.log(baseURL);
    let urls: string[] = [];
    lines.forEach(line => {
      urls.push(baseURL+line+"&sens=0");
      urls.push(baseURL+line+"&sens=1");
    });

    /*const request = axios.get("http://localhost:8090/optimizedpath?line=C1&sens=1");
    request
      .then((response) => {
        console.info(response.data);
      })
      .catch((error) => {
        console.error(error);
      });*/

    console.log(urls);

    const requests = urls.map((url) => axios.get(url));

    axios.all(requests).then((responses) => {
      responses.forEach((resp) => {
        console.info(resp.data.length);
      });
    }).catch((error) => {
      if (error instanceof AxiosError) {
        console.error(`Request failed with status code ${error.response?.status}`);
        console.log(error.response);
      } else {
        console.error(error.message);
      }
    });

    return this.service.getAll();
  }

}
