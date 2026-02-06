import { Controller, Get } from "@nestjs/common";
import { CatsService } from "./cats.service";

@Controller("api/cats")
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getAll() {
    return this.catsService.getAll();
  }

  @Get("random")
  async getRandom() {
    const { data: rows } = await this.catsService.getAll();
    const random =
      rows.length > 0 ? rows[Math.floor(Math.random() * rows.length)] : null;
    return random;
  }
}
