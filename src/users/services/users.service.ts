import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { ProductsService } from '../../products/services/products.service';
import { Order } from '../entities/order.entity';

@Injectable()
export class UsersService {
  private conterId: number = 1;
  private data: User[] = [
    {
      id: 1,
      email: 'email@mail.com',
      password: '1234',
      role: 'admin',
    },
  ];

  constructor(
    private productSvc: ProductsService,
    private configSvc: ConfigService,
  ) {}

  findAll() {
    // la sig linea es solo para mostrar como funciona el servicio de @nestjs/config
    const API_KEY = this.configSvc.get('API_KEY');
    console.log('APIKEY :>> ', API_KEY);
    return this.data;
  }

  findOne(id: number) {
    const items = this.data.find((item) => item.id === id);
    if (!items) throw new NotFoundException(`Id #${id} not found`);
    return items;
  }

  create(body: CreateUserDto) {
    const id = ++this.conterId;
    const created = { id, ...body };
    this.data.push(created);
    return created;
  }

  update(id: number, body: UpdateUserDto) {
    const items = this.findOne(id);
    const updated = { ...items, ...body };
    const idx = this.data.findIndex((item) => item.id === id);
    this.data[idx] = updated;
    return updated;
  }

  delete(id: number) {
    this.findOne(id);
    this.data = this.data.filter((item) => item.id !== id);
    return `Item #${id} deleted`;
  }

  getOrdersByUserId(id: number): Order {
    const user = this.findOne(id);
    const products = this.productSvc.findAll();
    const date = new Date();
    return { date, user, products };
  }
}
