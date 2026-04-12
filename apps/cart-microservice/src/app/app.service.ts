import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { RemoveFromCartDto } from './dto/remove-from-cart.dto';
import { CreateCartDto } from './dto/create-cart.dto';
import { OwnerDto } from './dto/owner.dto';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    @Inject(process.env.RABBITMQ_USERS_CLIENT)
    private readonly usersClient: ClientProxy,
  ) {}

  async findOneByOwnerId(ownerId: string): Promise<CartEntity> {
    const cart: CartEntity | null = await this.cartRepository.findOneBy({
      ownerId,
    });
    if (!cart)
      throw new NotFoundException({ message: 'The cart is not existing' });
    return cart;
  }

  async findOne(id: string): Promise<CartEntity> {
    const cart: CartEntity | null = await this.cartRepository.findOneBy({ id });
    if (!cart)
      throw new NotFoundException({ message: 'The cart is not existing' });
    return cart;
  }

  async createOne(dto: CreateCartDto): Promise<void> {
    const { ownerId } = dto;
    const candidate: OwnerDto = await firstValueFrom(
      this.usersClient.send('users-find-one', { ownerId }),
    );
    if (!candidate)
      throw new NotFoundException({ message: 'The owner is not existing' });
    const cart: CartEntity = await this.cartRepository.create(dto);
    await this.cartRepository.save(cart);
  }

  async addToCart(dto: AddToCartDto): Promise<void> {
    const { ownerId, itemId } = dto;
    /*
      1. check the product is existing in the database
    */
    const candidate: OwnerDto = await firstValueFrom(
      this.usersClient.send('users-find-one', { ownerId }),
    );
    if (!candidate)
      throw new NotFoundException({ message: 'The owner is not existing' });
    const cart: CartEntity | null = await this.cartRepository.findOneBy({
      ownerId,
    });
    if (!cart)
      throw new NotFoundException({ message: 'The cart is not existing' });
    const currentItemIds: string[] = cart.itemIds;
    const updatedItemIds: string[] = [...currentItemIds, itemId];
    await this.cartRepository.update(cart.id, {
      itemIds: updatedItemIds,
    });
  }

  async removeFromCart(dto: RemoveFromCartDto): Promise<void> {
    const { ownerId, itemId } = dto;
    /*
      1. check the product is existing in the database
    */
    const candidate: OwnerDto = await firstValueFrom(
      this.usersClient.send('users-find-one', { ownerId }),
    );
    if (!candidate)
      throw new NotFoundException({ message: 'The owner is not existing' });
    const cart: CartEntity | null = await this.cartRepository.findOneBy({
      ownerId,
    });
    if (!cart)
      throw new NotFoundException({ message: 'The cart is not existing' });
    const currentItemIds: string[] = cart.itemIds;
    const updatedItemIds: string[] = currentItemIds.filter(
      (id) => id !== itemId,
    );
    await this.cartRepository.update(cart.id, {
      itemIds: updatedItemIds,
    });
  }

  async deleteOne(id: string): Promise<void> {
    const cart: CartEntity | null = await this.cartRepository.findOneBy({ id });
    if (!cart)
      throw new NotFoundException({ message: 'The cart is not existing' });
    await this.cartRepository.delete(cart.id);
  }

  async deleteOneByOwnerId(ownerId: string): Promise<void> {
    const cart: CartEntity | null = await this.cartRepository.findOneBy({
      ownerId,
    });
    if (!cart)
      throw new NotFoundException({ message: 'The cart is not existing' });
    await this.cartRepository.delete(cart.id);
  }
}
