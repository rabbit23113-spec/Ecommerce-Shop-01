import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { OrderEntity } from './entities/order.entity';
import { CreateOrderDto } from './dto/order-create.dto';
import { UpdateOrderDto } from './dto/order-update.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('orders-find-all')
  async findAll(): Promise<OrderEntity[]> {
    return await this.appService.findAll();
  }

  @MessagePattern('orders-find-one')
  async findOne(@Payload() data: { id: string }): Promise<OrderEntity> {
    const { id } = data;
    return await this.appService.findOne(id);
  }

  @MessagePattern('orders-find-by-user-id')
  async findByUserId(
    @Payload() data: { userId: string },
  ): Promise<OrderEntity[]> {
    const { userId } = data;
    return await this.appService.findByUserId(userId);
  }

  @MessagePattern('orders-create-one')
  async createOne(
    @Payload() data: { dto: CreateOrderDto },
  ): Promise<OrderEntity> {
    const { dto } = data;
    return await this.appService.createOne(dto);
  }

  @EventPattern('orders-cancel-one')
  async cancelOne(@Payload() data: { id: string }): Promise<void> {
    const { id } = data;
    return await this.appService.cancelOne(id);
  }

  @EventPattern('orders-update-one')
  async updateOne(
    @Payload() data: { id: string; dto: UpdateOrderDto },
  ): Promise<void> {
    const { id, dto } = data;
    return await this.appService.updateOne(id, dto);
  }

  @EventPattern('orders-delete-one')
  async deleteOne(@Payload() data: { id: string }): Promise<void> {
    const { id } = data;
    return await this.appService.deleteOne(id);
  }
}
