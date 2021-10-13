import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private data: Product[] = [
    {
      id: 1,
      name: 'Name 1',
      description: 'Description 1',
      price: 1000,
      image: '',
      stock: 100,
    },
  ];

  findAll(): Product[] {
    return this.data;
  }

  findOne(id: number): Product {
    const items = this.data.find((item) => item.id === id);
    if (!items) throw new NotFoundException(`Id ${id} not found`);
    return items;
  }

  create(payload: CreateProductDto): Product {
    const id = ++this.counterId;
    const created = { ...payload, id };
    this.data.push(created);
    return created;
  }

  update(id: number, payload: UpdateProductDto): Product | string {
    const product = this.findOne(id);
    const idx = this.data.findIndex((item) => item.id === id);
    const updated = { ...product, ...payload };
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
