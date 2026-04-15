import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity, Status } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/payment-create.dto';
import { ClientProxy } from '@nestjs/microservices';
import { UserDto } from './dto/user.dto';
import { firstValueFrom } from 'rxjs';
import { OrderDto } from './dto/order.dto';
import { ProductDto } from './dto/product.dto';
import { UpdatePaymentDto } from './dto/payment-update.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentsRepository: Repository<PaymentEntity>,
    @Inject(process.env.RABBITMQ_ORDERS_CLIENT)
    private readonly ordersClient: ClientProxy,
    @Inject(process.env.RABBITMQ_USERS_CLIENT)
    private readonly usersClient: ClientProxy,
    @Inject(process.env.RABBITMQ_PRODUCTS_CLIENT)
    private readonly productsClient: ClientProxy,
  ) {}
  async findAll(): Promise<PaymentEntity[]> {
    return await this.paymentsRepository.find();
  }

  async findOne(id: string): Promise<PaymentEntity> {
    const payment: PaymentEntity | null =
      await this.paymentsRepository.findOneBy({ id });
    if (!payment)
      throw new NotFoundException({ message: 'The payment is not existing' });
    return payment;
  }

  async findByUserId(userId: string): Promise<PaymentEntity[]> {
    return await this.paymentsRepository.findBy({ userId });
  }

  async findByOrderId(orderId: string): Promise<PaymentEntity[]> {
    return await this.paymentsRepository.findBy({ orderId });
  }

  async createOne(dto: CreatePaymentDto): Promise<PaymentEntity> {
    const { userId, orderId } = dto;
    const user: UserDto = await firstValueFrom(
      this.usersClient.send('users-find-one', { id: userId }),
    );
    if (!user)
      throw new NotFoundException({ message: 'The user is not existing' });
    const order: OrderDto = await firstValueFrom(
      this.ordersClient.send('orders-find-one', { id: orderId }),
    );
    if (!order)
      throw new NotFoundException({ message: 'The order is not existing' });
    const productPromises: Promise<ProductDto>[] = order.productIds.map((id) =>
      firstValueFrom(this.productsClient.send('products-find-one', { id })),
    );
    const products: ProductDto[] = await Promise.all(productPromises);
    const total: number = products.reduce(
      (acc, product) => (product.price += acc),
      0,
    );
    const payment: PaymentEntity = await this.paymentsRepository.create({
      ...dto,
      total,
    });
    return payment;
  }

  async updateOne(id: string, dto: UpdatePaymentDto): Promise<void> {
    const payment: PaymentEntity | null =
      await this.paymentsRepository.findOneBy({
        id,
      });
    if (!payment)
      throw new NotFoundException({ message: 'The payment is not existing' });
    await this.paymentsRepository.update(id, dto);
  }

  async updateStatus(id: string, status: Status): Promise<void> {
    const payment: PaymentEntity | null =
      await this.paymentsRepository.findOneBy({
        id,
      });
    if (!payment)
      throw new NotFoundException({ message: 'The payment is not existing' });
    await this.paymentsRepository.update(id, {
      status,
    });
  }

  async deleteOne(id: string): Promise<void> {
    const payment: PaymentEntity | null =
      await this.paymentsRepository.findOneBy({
        id,
      });
    if (!payment)
      throw new NotFoundException({ message: 'The payment is not existing' });
    await this.paymentsRepository.delete(payment.id);
  }
}
