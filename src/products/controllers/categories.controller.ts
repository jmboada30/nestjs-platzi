import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';

import { CategoriesService } from '../services/categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './../dtos/category.dtos';
import { Query } from '@nestjs/common';
import { FilterCategoriesDto } from '../dtos/category.dtos';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesSvc: CategoriesService) {}

  @Get()
  findAll(@Query() query: FilterCategoriesDto) {
    return this.categoriesSvc.findAll(query);
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesSvc.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateCategoryDto) {
    return this.categoriesSvc.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCategoryDto,
  ) {
    return this.categoriesSvc.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesSvc.remove(+id);
  }
}
