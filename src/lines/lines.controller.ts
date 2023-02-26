import { Controller, Get } from "@nestjs/common";
import { LinesService } from "./lines.service";

@Controller('lines')
export class LinesController {

  constructor(private service: LinesService){}

  @Get()
  getAll(): any{
    return this.service.getAll();
  }

}
