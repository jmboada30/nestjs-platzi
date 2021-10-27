import {
  Injectable,
  NotFoundException,
  Inject,
  MethodNotAllowedException,
} from '@nestjs/common';

import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

import { ProductsService } from './../../products/services/products.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomersService } from './customers.service';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    @InjectRepository(User) private repository: Repository<User>,
    private customerSvc: CustomersService,
  ) {}

  async findAll() {
    return await this.repository.find({ relations: ['customer'] });
  }

  async findOne(id: number) {
    const found = await this.repository.findOne(id);
    if (!found) throw new NotFoundException(`Product #${id} not found`);
    return found;
  }

  async create(data: CreateUserDto) {
    try {
      const created = this.repository.create(data);

      if (data.customerId) {
        const customer = await this.customerSvc.findOne(data.customerId);
        created.customer = customer;
      }

      return await this.repository.save(created);
    } catch (error) {
      throw new MethodNotAllowedException(error.message);
    }
  }

  async update(id: number, changes: UpdateUserDto) {
    const found = await this.findOne(id);
    try {
      this.repository.merge(found, changes);
      return await this.repository.save(found);
    } catch (error) {
      throw new MethodNotAllowedException(error.message);
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.repository.delete(id);
  }

  async getOrderByUser(id: number) {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
    };
  }
}
