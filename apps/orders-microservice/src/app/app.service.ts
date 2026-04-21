import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity, Status } from './entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/order-create.dto';
import { UpdateOrderDto } from './dto/order-update.dto';
import { UserDto } from './dto/user.dto';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentDto } from './dto/payment.dto';
import { CreatePaymentDto } from './dto/payment-create.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly ordersRepository: Repository<OrderEntity>,
    @Inject(process.env.RABBITMQ_USERS_CLIENT)
    private readonly usersClient: ClientProxy,
    @Inject(process.env.RABBITMQ_PAYMENTS_CLIENT)
    private readonly paymentsClient: ClientProxy,
  ) {}

  async findAll(): Promise<OrderEntity[]> {
    return await this.ordersRepository.find();
  }

  async findOne(id: string): Promise<OrderEntity> {
    const order: OrderEntity | null = await this.ordersRepository.findOneBy({
      id,
    });
    if (!order)
      throw new NotFoundException({ message: 'The order is not existing' });
    return order;
  }

  async findByUserId(userId: string): Promise<OrderEntity[]> {
    const user: UserDto = await firstValueFrom(
      this.usersClient.send('users-find-one', { id: userId }),
    );
    if (!user)
      throw new NotFoundException({ message: 'The user is not existing' });
    return await this.ordersRepository.findBy({ userId });
  }

  async createOne(dto: CreateOrderDto): Promise<OrderEntity> {
    const { userId } = dto;
    const user: UserDto = await firstValueFrom(
      this.usersClient.send('users-find-one', { id: userId }),
    );
    if (!user)
      throw new NotFoundException({ message: 'The user is not existing' });
    const order: OrderEntity = await this.ordersRepository.create(dto);
    await this.ordersRepository.save(order);
    const newPaymentDto: CreatePaymentDto = {
      userId,
      orderId: order.id,
    };
    const payment: PaymentDto = await firstValueFrom(
      this.paymentsClient.send('payments-create-one', { dto: newPaymentDto }),
    );
    await this.updateOne(order.id, {
      paymentId: payment.id,
    });
    const updatedUserOrders: string[] = [...user.orderIds, order.id];
    await this.usersClient.emit('users-update-one', { orderIds: updatedUserOrders })
    return order;
  }

  async cancelOne(id: string): Promise<void> {
    const order: OrderEntity | null = await this.ordersRepository.findOneBy({
      id,
    });
    if (!order)
      throw new NotFoundException({ message: 'The order is not existing' });
    await this.ordersRepository.update(id, {
      status: Status.CANCELLED,
    });
  }

  async updateOne(id: string, dto: UpdateOrderDto): Promise<void> {
    const order: OrderEntity | null = await this.ordersRepository.findOneBy({
      id,
    });
    if (!order)
      throw new NotFoundException({ message: 'The order is not existing' });
    await this.ordersRepository.update(id, dto);
  }

  async deleteOne(id: string): Promise<void> {
    const order: OrderEntity | null = await this.ordersRepository.findOneBy({
      id,
    });
    if (!order)
      throw new NotFoundException({ message: 'The order is not existing' });
    await this.ordersRepository.delete(order.id);
  }
}
