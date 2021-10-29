import {
  Injectable,
  MethodNotAllowedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from '../entities/category.entity';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  FilterCategoriesDto,
} from '../dtos/category.dtos';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private repository: Repository<Category>,
  ) {}

  async findAll(query?: FilterCategoriesDto) {
    if (query) {
      const { limit, offset } = query;
      return await this.repository.find({ take: limit, skip: offset });
    }
    return await this.repository.find();
  }

  async findOne(id: number) {
    const found = await this.repository.findOne(id);
    if (!found) throw new NotFoundException(`Product #${id} not found`);
    return found;
  }

  async create(data: CreateCategoryDto) {
    try {
      const created = this.repository.create(data);
      return await this.repository.save(created);
    } catch (error) {
      throw new MethodNotAllowedException(error.message);
    }
  }

  async update(id: number, changes: UpdateCategoryDto) {
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
