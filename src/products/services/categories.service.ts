import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';

@Injectable()
export class CategoriesService {
  private counterId = 1;
  private data: Category[] = [
    {
      id: 1,
      name: 'Name',
    },
  ];

  findAll(): Category[] {
    return this.data;
  }

  findOne(id: number): Category {
    const items = this.data.find((item) => item.id === id);
    if (!items) throw new NotFoundException(`Id ${id} not found`);
    return items;
  }

  create(payload: CreateCategoryDto): Category {
    const id = ++this.counterId;
    const created = { ...payload, id };
    this.data.push(created);
    return created;
  }

  update(id: number, payload: UpdateCategoryDto): Category | string {
    const category = this.findOne(id);
    const idx = this.data.findIndex((item) => item.id === id);
    const updated = { ...category, ...payload };
    this.data[idx] = updated;
    return updated;
  }

  delete(id: number): string {
    this.findOne(id);
    const idx = this.data.findIndex((item) => item.id === id);
    if (idx < 0) return `Id ${id} not found`;

    this.data = this.data.filter((item) => item.id !== id);
    return `Item with id ${id} deleted`;
  }
}
