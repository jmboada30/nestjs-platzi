import { Module } from '@nestjs/common';
import { ProductsModule } from '../products/products.module';

import { CustomersService } from './services/customers.service';
import { UsersService } from './services/users.service';

import { CustomersController } from './controllers/customers.controller';
import { UsersController } from './controllers/users.controller';

@Module({
  imports: [ProductsModule],
  controllers: [CustomersController, UsersController],
  providers: [CustomersService, UsersService],
})
export class UsersModule {}
