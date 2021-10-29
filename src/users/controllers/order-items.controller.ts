import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { OrderItemService } from '../services/order-item.service';
import { CreateOrderItemDto, UpdateOrderItemDto } from '../dtos/order-item.dto';
import { ParseIntPipe } from '../../common/parse-int.pipe';

@Controller('order-items')
export class OrderItemsController {
  constructor(private orderItemSvc: OrderItemService) {}

  @Post()
  addItem(@Body() payload: CreateOrderItemDto) {
    return this.orderItemSvc.addItemOrder(payload);
  }

  @Put(':id')
  updateItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() changes: UpdateOrderItemDto,
  ) {
    return this.orderItemSvc.updateItemOrder(id, changes);
  }
}
