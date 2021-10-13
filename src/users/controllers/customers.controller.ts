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
import { CustomersService } from '../services/customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dto';

@Controller('customers')
export class CustomersController {
  constructor(private customerSvc: CustomersService) {}

  @Get()
  getAll(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    return this.customerSvc.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.customerSvc.findOne(id);
  }

  @Post()
  create(@Body() body: CreateCustomerDto) {
    return this.customerSvc.create(body);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateCustomerDto,
  ) {
    return this.customerSvc.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.customerSvc.delete(id);
  }
}
