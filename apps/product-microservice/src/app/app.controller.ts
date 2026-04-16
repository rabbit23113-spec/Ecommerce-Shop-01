import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { ProductEntity } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('products-find-all')
  async findAll(): Promise<ProductEntity[]> {
    return await this.appService.findAll();
  }

  @MessagePattern('products-find-one')
  async findOne(@Payload() data: { id: string }): Promise<ProductEntity> {
    const { id } = data;
    return await this.appService.findOne(id);
  }

  @MessagePattern('products-find-by-category-id')
  async findByCategoryId(
    @Payload() data: { categoryId: string },
  ): Promise<ProductEntity[]> {
    const { categoryId } = data;
    return await this.appService.findByCategoryId(categoryId);
  }

  @MessagePattern('products-find-by-brand-id')
  async findByBrandId(
    @Payload() data: { brandId: string },
  ): Promise<ProductEntity[]> {
    const { brandId } = data;
    return await this.appService.findByBrandId(brandId);
  }

  @MessagePattern('products-create-one')
  async createOne(
    @Payload() data: { dto: CreateProductDto },
  ): Promise<ProductEntity> {
    const { dto } = data;
    return await this.appService.createOne(dto);
  }

  @EventPattern('products-update-one')
  async updateOne(
    @Payload() data: { id: string; dto: UpdateProductDto },
  ): Promise<void> {
    const { id, dto } = data;
    return await this.appService.updateOne(id, dto);
  }

  @EventPattern('products-delete-one')
  async deleteOne(@Payload() data: { id: string }): Promise<void> {
    const { id } = data;
    return await this.appService.deleteOne(id);
  }
}
