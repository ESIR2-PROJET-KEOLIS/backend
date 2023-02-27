import { Body, Controller, Get } from "@nestjs/common";
import { LinesService } from "./lines.service";

@Controller('lines')
export class LinesController {

  constructor(private service: LinesService){}

  @Get()
  getAll(@Body() lines: string[]): any{
    return this.service.getAll(lines);
  }

}
