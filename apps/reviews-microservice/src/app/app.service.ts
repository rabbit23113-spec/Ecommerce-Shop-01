import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewEntity } from './entities/review.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { firstValueFrom } from 'rxjs';
import { CreateReviewDto } from './dto/review-create.dto';
import { ProductDto } from './dto/product.dto';
import { UpdateReviewDto } from './dto/review-update.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewsRepository: Repository<ReviewEntity>,
    @Inject(process.env.RABBITMQ_PRODUCTS_CLIENT)
    private readonly productsClient: ClientProxy,
    @Inject(process.env.RABBITMQ_USERS_CLIENT)
    private readonly usersClient: ClientProxy,
  ) {}

  async findByUserId(userId: string): Promise<ReviewEntity[]> {
    const user: UserDto = await firstValueFrom(
      this.usersClient.send('users-find-one', { id: userId }),
    );
    if (!user)
      throw new NotFoundException({ message: 'The user is not existing' });
    return await this.reviewsRepository.findBy({ userId });
  }

  async findByProductId(productId: string): Promise<ReviewEntity[]> {
    const product: ProductDto = await firstValueFrom(
      this.productsClient.send('products-find-one', { id: productId }),
    );
    if (!product)
      throw new NotFoundException({ message: 'The product is not existing' });
    return await this.reviewsRepository.findBy({ productId });
  }

  async createOne(dto: CreateReviewDto): Promise<ReviewEntity> {
    const { userId, productId } = dto;
    const user: UserDto = await firstValueFrom(
      this.usersClient.send('users-find-one', { id: userId }),
    );
    if (!user)
      throw new NotFoundException({ message: 'The user is not existing' });
    const product: ProductDto = await firstValueFrom(
      this.productsClient.send('products-find-one', { id: productId }),
    );
    if (!product)
      throw new NotFoundException({ message: 'The product is not existing' });
    const review: ReviewEntity = await this.reviewsRepository.create(dto);
    return review;
  }

  async updateOne(id: string, dto: UpdateReviewDto): Promise<void> {
    const { userId, productId } = dto;
    const review: ReviewEntity | null = await this.reviewsRepository.findOneBy({
      id,
    });
    if (!review)
      throw new NotFoundException({ message: 'The review is not existing' });
    const user: UserDto = await firstValueFrom(
      this.usersClient.send('users-find-one', { id: userId }),
    );
    if (!user)
      throw new NotFoundException({ message: 'The user is not existing' });
    const product: ProductDto = await firstValueFrom(
      this.productsClient.send('products-find-one', { id: productId }),
    );
    if (!product)
      throw new NotFoundException({ message: 'The product is not existing' });
    await this.reviewsRepository.update(id, dto);
  }

  async deleteOne(id: string): Promise<void> {
    const review: ReviewEntity | null = await this.reviewsRepository.findOneBy({
      id,
    });
    if (!review)
      throw new NotFoundException({ message: 'The review is not existing' });
    await this.reviewsRepository.delete(review.id);
  }
}
