import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dto';

@Injectable()
export class CustomersService {
  private counterId = 1;
  private data: Customer[] = [
    {
      id: 1,
      name: 'Jhon',
      lastName: 'Doe',
      phone: '998877897',
    },
  ];

  findAll(): Customer[] {
    return this.data;
  }

  findOne(id: number): Customer {
    const items = this.data.find((item) => item.id === id);
    if (!items) throw new NotFoundException(`Id #${id} not found`);
    return items;
  }

  create(payload: CreateCustomerDto): Customer {
    const id = ++this.counterId;
    const created = { ...payload, id };
    this.data.push(created);
    return created;
  }

  update(id: number, payload: UpdateCustomerDto): Customer | string {
    const finded = this.findOne(id);
    const idx = this.data.findIndex((item) => item.id === id);
    const updated = { ...finded, ...payload };
    this.data[idx] = updated;
    return updated;
  }

  delete(id: number): string {
    this.findOne(id);
    this.data = this.data.filter((item) => item.id !== id);
    return `Item #${id} deleted`;
  }
}
