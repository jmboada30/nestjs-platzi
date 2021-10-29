import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import { ParseIntPipe } from '../../common/parse-int.pipe';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private orderSvc: OrdersService) {}

  @Get()
  getAll() {
    return this.orderSvc.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.orderSvc.findOne(id);
  }

  @Post()
  create(@Body() body: CreateOrderDto) {
    return this.orderSvc.create(body);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() changes: UpdateOrderDto,
  ) {
    return this.orderSvc.update(id, changes);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.orderSvc.delete(id);
  }
}
