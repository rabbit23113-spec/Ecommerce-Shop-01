import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { OrderResponseDto } from './dto/order-response.dto';
import { firstValueFrom } from 'rxjs';
import { CreateOrderDto } from './dto/order-create.dto';
import { UpdateOrderDto } from './dto/order-update.dto';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(process.env.RABBITMQ_ORDERS_CLIENT)
    private readonly ordersClient: ClientProxy,
  ) {}

  async findAll(): Promise<OrderResponseDto[]> {
    return await firstValueFrom(this.ordersClient.send('orders-find-all', {}));
  }

  async findOne(id: string): Promise<OrderResponseDto> {
    return await firstValueFrom(
      this.ordersClient.send('orders-find-one', { id }),
    );
  }

  async findByUserId(id: string): Promise<OrderResponseDto[]> {
    return await firstValueFrom(
      this.ordersClient.send('orders-find-by-user-id', { userId: id }),
    );
  }

  async createOne(dto: CreateOrderDto): Promise<OrderResponseDto> {
    return await firstValueFrom(
      this.ordersClient.send('orders-create-one', { dto }),
    );
  }

  async cancelOne(id: string): Promise<void> {
    return await firstValueFrom(
      this.ordersClient.emit('orders-cancel-one', { id }),
    );
  }

  async updateOne(id: string, dto: UpdateOrderDto): Promise<void> {
    return await firstValueFrom(
      this.ordersClient.emit('orders-update-one', { id, dto }),
    );
  }

  async deleteOne(id: string): Promise<void> {
    return await firstValueFrom(
      this.ordersClient.emit('orders-delete-one', { id }),
    );
  }
}
