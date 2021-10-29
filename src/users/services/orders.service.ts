import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from '../entities/order.entity';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}

  async findAll() {
    const orders = await this.orderRepo.find();
    return orders;
  }

  async findOne(id: number) {
    const order = await this.orderRepo.findOne(id, {
      relations: ['customer', 'items', 'items.product'],
    });
    if (!order) throw new NotFoundException(`Product #${id} not found`);
    return order;
  }

  async create(data: CreateOrderDto) {
    const newOrder = this.orderRepo.create(data);
    if (data.customerId) {
      newOrder.customer = await this.customerRepo.findOne(data.customerId);
    }
    return await this.orderRepo.save(newOrder);
  }

  async update(id: number, changes: UpdateOrderDto) {
    const order = await this.orderRepo.findOne(id);
    this.orderRepo.merge(order, changes);
    return await this.orderRepo.save(order);
  }

  async delete(id: number) {
    const order = await this.orderRepo.findOne(id);
    if (!order) throw new NotFoundException(`Product #${id} not found`);
    return await this.orderRepo.delete(id);
  }
}
