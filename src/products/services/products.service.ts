import {
  Injectable,
  MethodNotAllowedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dtos';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private repository: Repository<Product>,
  ) {}

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: number) {
    const found = await this.repository.findOne(id);
    if (!found) throw new NotFoundException(`Product #${id} not found`);
    return found;
  }

  async create(data: CreateProductDto) {
    try {
      const created = this.repository.create(data);
      return await this.repository.save(created);
    } catch (error) {
      throw new MethodNotAllowedException(error.message);
    }
  }

  async update(id: number, changes: UpdateProductDto) {
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
}
