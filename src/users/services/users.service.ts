import {
  Injectable,
  NotFoundException,
  Inject,
  MethodNotAllowedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';

import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

import { ProductsService } from './../../products/services/products.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
    @Inject('PG') private clientPg: Client,
    @InjectRepository(User) private repository: Repository<User>,
  ) {}

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: number) {
    const found = await this.repository.findOne(id);
    if (!found) throw new NotFoundException(`Product #${id} not found`);
    return found;
  }

  async create(data: CreateUserDto) {
    try {
      const created = this.repository.create(data);
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

  async getTasks() {
    try {
      const { rows } = await this.clientPg.query('SELECT * FROM tasks;');
      return rows;
    } catch (error) {
      return error;
    }
  }
}
