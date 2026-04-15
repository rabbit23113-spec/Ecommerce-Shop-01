import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CartResponseDto } from './dto/cart-response.dto';
import { firstValueFrom } from 'rxjs';
import { CreateCartDto } from './dto/create-cart.dto';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { RemoveFromCartDto } from './dto/remove-from-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @Inject(process.env.RABBITMQ_CART_CLIENT)
    private readonly cartClient: ClientProxy,
  ) {}

  async findOneByOwnerId(ownerId: string): Promise<CartResponseDto> {
    return await firstValueFrom(
      this.cartClient.send('cart-find-one-by-owner-id', { ownerId }),
    );
  }

  async findOne(id: string): Promise<CartResponseDto> {
    return await firstValueFrom(this.cartClient.send('cart-find-one', { id }));
  }

  async createOne(dto: CreateCartDto): Promise<void> {
    return await firstValueFrom(
      this.cartClient.emit('cart-create-one', { dto }),
    );
  }

  async addToCart(dto: AddToCartDto): Promise<void> {
    return await firstValueFrom(this.cartClient.emit('cart-add-item', { dto }));
  }

  async removeFromCart(dto: RemoveFromCartDto): Promise<void> {
    return await firstValueFrom(this.cartClient.emit('cart-remove-item', { dto }));
  }

  async deleteOne(id: string): Promise<void> {
    return await firstValueFrom(this.cartClient.emit('cart-delete-one', { id }));
  }
}
