import { Controller, Get, Param } from "@nestjs/common";
import { LinesService } from "./lines.service";

@Controller('lines')
export class LinesController {

  constructor(private service: LinesService){}

  @Get()
  getAll(): any{
    let lines = ['10', '11', '12', '13', '14', '226', '32', '34', '39', '50', '51', '52', '53', '54', '55', '56', '59', '61', '62', '64', '65', '67', '68', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '91', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7']
    return this.service.getAll(lines);
  }

}
