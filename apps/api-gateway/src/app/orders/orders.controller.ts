import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/order-create.dto';
import { OrderResponseDto } from './dto/order-response.dto';
import { UpdateOrderDto } from './dto/order-update.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async findAll(): Promise<OrderResponseDto[]> {
    return await this.ordersService.findAll();
  }

  @Get('find/:id')
  async findOne(@Param('id') id: string): Promise<OrderResponseDto> {
    return await this.ordersService.findOne(id);
  }

  @Get('user/:id')
  async findByUserId(@Param('id') id: string): Promise<OrderResponseDto[]> {
    return await this.ordersService.findByUserId(id);
  }

  @Post('create')
  async createOne(@Body() dto: CreateOrderDto): Promise<OrderResponseDto> {
    return await this.ordersService.createOne(dto);
  }

  @Patch('cancel/:id')
  async cancelOne(@Param('id') id: string): Promise<void> {
    return await this.ordersService.cancelOne(id);
  }

  @Patch('update/:id')
  async updateOne(
    @Param('id') id: string,
    @Body() dto: UpdateOrderDto,
  ): Promise<void> {
    return await this.ordersService.updateOne(id, dto);
  }

  @Delete('delete/:id')
  async deleteOne(@Param('id') id: string): Promise<void> {
    return await this.ordersService.deleteOne(id);
  }
}
