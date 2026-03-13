import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";
import { CreateCatDto } from "./create-cat.dto";
import { CatsService } from "./cats.service";

@Controller("api/cats")
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getAll() {
    return this.catsService.getAll();
  }

  @Post()
  create(@Body() dto: CreateCatDto) {
    return this.catsService.addOne(dto);
  }

  @Get("random")
  async getRandom() {
    const { data: rows } = await this.catsService.getAll();
    const random =
      rows.length > 0 ? rows[Math.floor(Math.random() * rows.length)] : null;
    return random;
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.catsService.removeOne(id);
  }
}
