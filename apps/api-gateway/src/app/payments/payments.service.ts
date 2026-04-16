import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentResponseDto, Status } from './dto/payment-response.dto';
import { firstValueFrom } from 'rxjs';
import { CreatePaymentDto } from './dto/payment-create.dto';
import { UpdatePaymentDto } from './dto/payment-update.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @Inject(process.env.RABBITMQ_PAYMENTS_CLIENT)
    private readonly paymentsClient: ClientProxy,
  ) {}

  async findAll(): Promise<PaymentResponseDto[]> {
    return await firstValueFrom(
      this.paymentsClient.send('payments-find-all', {}),
    );
  }

  async findOne(id: string): Promise<PaymentResponseDto> {
    return await firstValueFrom(
      this.paymentsClient.send('payments-find-one', { id }),
    );
  }

  async findByUserId(id: string): Promise<PaymentResponseDto[]> {
    return await firstValueFrom(
      this.paymentsClient.send('payments-find-by-user-id', { userId: id }),
    );
  }

  async findByOrderId(id: string): Promise<PaymentResponseDto[]> {
    return await firstValueFrom(
      this.paymentsClient.send('payments-find-by-order-id', { orderId: id }),
    );
  }

  async createOne(dto: CreatePaymentDto): Promise<PaymentResponseDto> {
    return await firstValueFrom(
      this.paymentsClient.send('payments-create-one', { dto }),
    );
  }

  async updateOne(id: string, dto: UpdatePaymentDto): Promise<void> {
    return await firstValueFrom(
      this.paymentsClient.emit('payments-update-one', { id, dto }),
    );
  }

  async updateStatus(id: string, status: Status): Promise<void> {
    return await firstValueFrom(
      this.paymentsClient.emit('payments-update-status', { id, status }),
    );
  }

  async deleteOne(id: string): Promise<void> {
    return await firstValueFrom(
      this.paymentsClient.emit('payments-delete-one', { id }),
    );
  }
}
