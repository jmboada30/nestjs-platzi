import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import {
  Controller,
  Query,
  Param,
  Body,
  ParseIntPipe,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private usersSvc: UsersService) {}

  @Get()
  getAll() {
    return this.usersSvc.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersSvc.findOne(id);
  }

  @Get(':id/orders')
  getOrdersByUserId(@Param('id', ParseIntPipe) id: number) {
    return this.usersSvc.getOrdersByUserId(id);
  }

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.usersSvc.create(body);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDto) {
    return this.usersSvc.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersSvc.delete(id);
  }
}
