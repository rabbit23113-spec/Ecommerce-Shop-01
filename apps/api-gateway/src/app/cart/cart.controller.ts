import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CartService } from './cart.service';
import { RemoveFromCartDto } from './dto/remove-from-cart.dto';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { CreateCartDto } from './dto/create-cart.dto';
import { CartResponseDto } from './dto/cart-response.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async findOneByOwnerId(
    @Query('owner') ownerId: string,
  ): Promise<CartResponseDto> {
    return await this.cartService.findOneByOwnerId(ownerId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CartResponseDto> {
    return await this.cartService.findOne(id);
  }

  @Post('create')
  async createOne(@Body() dto: CreateCartDto): Promise<void> {
    return await this.cartService.createOne(dto);
  }

  @Patch('add')
  async addToCart(@Body() dto: AddToCartDto): Promise<void> {
    return await this.cartService.addToCart(dto);
  }

  @Patch('remove')
  async removeFromCart(@Body() dto: RemoveFromCartDto): Promise<void> {
    return await this.cartService.removeFromCart(dto);
  }

  @Delete('delete')
  async deleteOne(@Body() body: { id: string }): Promise<void> {
    const { id } = body;
    return await this.cartService.deleteOne(id);
  }
}
