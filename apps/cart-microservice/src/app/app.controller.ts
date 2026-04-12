import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CartEntity } from './entities/cart.entity';
import { CreateCartDto } from './dto/create-cart.dto';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { RemoveFromCartDto } from './dto/remove-from-cart.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('cart-find-one-by-owner-id')
  async findOneByOwnerId(
    @Payload() data: { ownerId: string },
  ): Promise<CartEntity> {
    const { ownerId } = data;
    return await this.appService.findOneByOwnerId(ownerId);
  }

  @MessagePattern('cart-find-one')
  async findOne(@Payload() data: { id: string }): Promise<CartEntity> {
    const { id } = data;
    return await this.appService.findOne(id);
  }

  @EventPattern('cart-create-one')
  async createOne(@Payload() data: { dto: CreateCartDto }): Promise<void> {
    const { dto } = data;
    return await this.appService.createOne(dto);
  }

  @EventPattern('cart-add-item')
  async addToCart(@Payload() data: { dto: AddToCartDto }): Promise<void> {
    const { dto } = data;
    return await this.appService.addToCart(dto);
  }

  @EventPattern('cart-remove-item')
  async removeFromCart(
    @Payload() data: { dto: RemoveFromCartDto },
  ): Promise<void> {
    const { dto } = data;
    return await this.appService.removeFromCart(dto);
  }

  @EventPattern('cart-delete-one')
  async deleteOne(@Payload() data: { id: string }): Promise<void> {
    const { id } = data;
    return await this.appService.deleteOne(id);
  }
}
