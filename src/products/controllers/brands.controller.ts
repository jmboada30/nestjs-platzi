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
import { BrandsService } from '../services/brands.service';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dto';

@Controller('brands')
export class BrandsController {
  constructor(private brandsSvc: BrandsService) {}

  @Get()
  getAll(@Query('limit') limit = 100, @Query('offset') offset = 100) {
    return this.brandsSvc.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.brandsSvc.findOne(id);
  }

  @Post()
  create(@Body() body: CreateBrandDto) {
    return this.brandsSvc.create(body);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateBrandDto) {
    return this.brandsSvc.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.brandsSvc.delete(id);
  }
}
