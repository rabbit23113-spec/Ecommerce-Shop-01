import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ProductResponseDto } from './dto/product-response.dto';
import { firstValueFrom } from 'rxjs';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @Inject(process.env.RABBITMQ_PRODUCTS_CLIENT)
    private readonly productsClient: ClientProxy,
  ) {}

  async findAll(): Promise<ProductResponseDto[]> {
    return await firstValueFrom(
      this.productsClient.send('products-find-all', {}),
    );
  }

  async findOne(id: string): Promise<ProductResponseDto> {
    return await firstValueFrom(
      this.productsClient.send('products-find-one', { id }),
    );
  }

  async findByCategoryId(id: string): Promise<ProductResponseDto[]> {
    return await firstValueFrom(
      this.productsClient.send('products-find-by-category-id', {
        categoryId: id,
      }),
    );
  }

  async findByBrandId(id: string): Promise<ProductResponseDto[]> {
    return await firstValueFrom(
      this.productsClient.send('products-find-by-brand-id', { brandId: id }),
    );
  }

  async createOne(dto: CreateProductDto): Promise<ProductResponseDto> {
    return await firstValueFrom(
      this.productsClient.send('products-create-one', { dto }),
    );
  }

  async updateOne(id: string, dto: UpdateProductDto): Promise<void> {
    return await firstValueFrom(
      this.productsClient.emit('products-update-one', { id, dto }),
    );
  }

  async deleteOne(id: string): Promise<void> {
    return await firstValueFrom(
      this.productsClient.emit('products-delete-one', { id }),
    );
  }
}
