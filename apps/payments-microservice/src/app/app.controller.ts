import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentEntity, Status } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/payment-create.dto';
import { UpdatePaymentDto } from './dto/payment-update.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('payments-find-all')
  async findAll(): Promise<PaymentEntity[]> {
    return await this.appService.findAll();
  }

  @MessagePattern('payments-find-one')
  async findOne(@Payload() data: { id: string }): Promise<PaymentEntity> {
    const { id } = data;
    return await this.appService.findOne(id);
  }

  @MessagePattern('payments-find-by-user-id')
  async findByUserId(
    @Payload() data: { userId: string },
  ): Promise<PaymentEntity[]> {
    const { userId } = data;
    return await this.appService.findByUserId(userId);
  }

  @MessagePattern('payments-find-by-order-id')
  async findByOrderId(
    @Payload() data: { orderId: string },
  ): Promise<PaymentEntity[]> {
    const { orderId } = data;
    return await this.appService.findByOrderId(orderId);
  }

  @MessagePattern('payments-create-one')
  async createOne(
    @Payload() data: { dto: CreatePaymentDto },
  ): Promise<PaymentEntity> {
    const { dto } = data;
    return await this.appService.createOne(dto);
  }

  @EventPattern('payments-update-one')
  async updateOne(
    @Payload() data: { id: string; dto: UpdatePaymentDto },
  ): Promise<void> {
    const { id, dto } = data;
    return await this.appService.updateOne(id, dto);
  }

  @EventPattern('payments-update-status')
  async updateStatus(
    @Payload() data: { id: string; status: Status },
  ): Promise<void> {
    const { id, status } = data;
    return await this.appService.updateStatus(id, status);
  }

  @EventPattern('payments-delete-one')
  async deleteOne(@Payload() data: { id: string }): Promise<void> {
    const { id } = data;
    return await this.appService.deleteOne(id);
  }
}
