import { Injectable, NotFoundException } from '@nestjs/common';
import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dto';

@Injectable()
export class BrandsService {
  private counterId = 1;
  private data: Brand[] = [
    {
      id: 1,
      name: 'Name 1',
      image: 'url.com',
    },
  ];

  findAll(): Brand[] {
    return this.data;
  }

  findOne(id: number): Brand {
    const items = this.data.find((item) => item.id === id);
    if (!items) throw new NotFoundException(`Id ${id} not found`);
    return items;
  }

  create(payload: CreateBrandDto): Brand {
    const id = ++this.counterId;
    const created = { ...payload, id };
    this.data.push(created);
    return created;
  }

  update(id: number, payload: UpdateBrandDto): Brand | string {
    const brand = this.findOne(id);
    const idx = this.data.findIndex((item) => item.id === id);
    const updated = { ...brand, ...payload };
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
