import {
  Controller,
  Query,
  Param,
  Body,
  ParseIntPipe,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CategoriesService } from '../services/categories.service';

import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categorySvc: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'List of categories' })
  getAll(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    return this.categorySvc.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.categorySvc.findOne(id);
  }

  @Post()
  create(@Body() body: CreateCategoryDto) {
    return this.categorySvc.create(body);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateCategoryDto,
  ) {
    return this.categorySvc.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.categorySvc.delete(id);
  }
}
