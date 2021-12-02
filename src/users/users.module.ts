import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsModule } from '../products/products.module';

import { CustomerController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { Customer } from './entities/customer.entity';

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { User } from './entities/user.entity';

import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { OrdersService } from './services/orders.service';
import { OrderItemService } from './services/order-item.service';
import { OrdersController } from './controllers/orders.controller';
import { OrderItemsController } from './controllers/order-items.controller';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forFeature([User, Customer, Order, OrderItem]),
  ],
  controllers: [
    CustomerController,
    UsersController,
    OrdersController,
    OrderItemsController,
  ],
  providers: [CustomersService, UsersService, OrdersService, OrderItemService],
  exports: [UsersService],
})
export class UsersModule {}
