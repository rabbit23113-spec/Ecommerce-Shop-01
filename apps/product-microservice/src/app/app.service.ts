import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { CategoryDto } from './dto/category.dto';
import { firstValueFrom } from 'rxjs';
import { BrandDto } from './dto/brand.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,

    @Inject(process.env.RABBITMQ_BRAND_CLIENT)
    private readonly brandClient: ClientProxy,
    @Inject(process.env.RABBITMQ_CATEGORY_CLIENT)
    private readonly categoryClient: ClientProxy,
  ) {}

  async findAll(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }

  async findOne(id: string): Promise<ProductEntity> {
    const product: ProductEntity | null =
      await this.productRepository.findOneBy({ id });
    if (!product)
      throw new NotFoundException({ message: 'The product is not existing' });
    return product;
  }

  async findByCategoryId(categoryId: string): Promise<ProductEntity[]> {
    const category: CategoryDto = await firstValueFrom(
      this.categoryClient.send('category-find-one', { categoryId }),
    );
    if (!category)
      throw new NotFoundException({ message: 'The category is not existing' });
    return await this.productRepository.findBy({ categoryId });
  }

  async findByBrandId(brandId: string): Promise<ProductEntity[]> {
    const brand: BrandDto = await firstValueFrom(
      this.brandClient.send('brand-find-one', { brandId }),
    );
    if (!brand)
      throw new NotFoundException({ message: 'The brand is not existing' });
    return await this.productRepository.findBy({ brandId });
  }

  async createOne(dto: CreateProductDto): Promise<ProductEntity> {
    const product: ProductEntity = await this.productRepository.create(dto);
    await this.productRepository.save(product);
    return product;
  }

  async updateOne(id: string, dto: UpdateProductDto): Promise<void> {
    const product: ProductEntity | null =
      await this.productRepository.findOneBy({
        id,
      });
    if (!product)
      throw new NotFoundException({ message: 'The product is not existing' });
    await this.productRepository.update(id, dto);
  }

  async deleteOne(id: string): Promise<void> {
    const product: ProductEntity | null =
      await this.productRepository.findOneBy({ id });
    if (!product)
      throw new NotFoundException({ message: 'The product is not existing' });
    await this.productRepository.delete(product.id);
  }
}
