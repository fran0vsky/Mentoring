import { Controller, Get } from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('api/cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getAll() {
    return this.catsService.getAll();
  }

  @Get('random')
  getRandom() {
    return this.catsService.getOneRandom();
  }
}
