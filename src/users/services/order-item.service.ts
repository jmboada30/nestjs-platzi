import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from '../entities/order-item.entity';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { CreateOrderItemDto, UpdateOrderItemDto } from '../dtos/order-item.dto';
import { Product } from '../../products/entities/product.entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem) private orderItemRepo: Repository<OrderItem>,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async addItemOrder(body: CreateOrderItemDto) {
    const newItem = new OrderItem();
    newItem.product = await this.productRepo.findOne(body.productId);
    newItem.order = await this.orderRepo.findOne(body.orderId);
    newItem.quantity = body.quantity;

    return await this.orderItemRepo.save(newItem);
  }

  async updateItemOrder(id: number, changes: UpdateOrderItemDto) {
    const orderItem = await this.orderItemRepo.findOne(id);
    if (changes.productId) {
      orderItem.product = await this.productRepo.findOne(changes.productId);
    }

    if (changes.orderId) {
      orderItem.order = await this.orderRepo.findOne(changes.orderId);
    }

    this.orderItemRepo.merge(orderItem, changes);

    return await this.orderItemRepo.save(orderItem);
  }

  async deleteItemOrder(id: number) {
    return await this.orderItemRepo.delete(id);
  }
}
