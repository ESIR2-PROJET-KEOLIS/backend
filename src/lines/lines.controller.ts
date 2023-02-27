import { Body, Controller, Get } from "@nestjs/common";
import { LinesService } from "./lines.service";
import axios, { AxiosError } from "axios";
import * as process from "process";

@Controller('lines')
export class LinesController {

  constructor(private service: LinesService){}

  @Get()
  getAll(@Body() lines: string[]): any{

    /*console.log(urls);

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
    });*/

    return this.service.getAll(lines);
  }

}
