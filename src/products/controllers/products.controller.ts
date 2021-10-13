import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ProductsService } from '../services/products.service';

import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productSvc: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'List of Products' })
  getAll(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand,
  ) {
    return this.productSvc.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.productSvc.findOne(id);
  }

  @Post()
  create(@Body() body: CreateProductDto) {
    return this.productSvc.create(body);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProductDto,
  ) {
    return this.productSvc.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productSvc.delete(id);
  }
}
