import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { ReviewEntity } from './entities/review.entity';
import { CreateReviewDto } from './dto/review-create.dto';
import { UpdateReviewDto } from './dto/review-update.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('reviews-find-by-user-id')
  async findByUserId(
    @Payload() data: { userId: string },
  ): Promise<ReviewEntity[]> {
    const { userId } = data;
    return await this.appService.findByUserId(userId);
  }

  @MessagePattern('reviews-find-by-product-id')
  async findByProductId(
    @Payload() data: { productId: string },
  ): Promise<ReviewEntity[]> {
    const { productId } = data;
    return await this.appService.findByProductId(productId);
  }

  @MessagePattern('reviews-create-one')
  async createOne(
    @Payload() data: { dto: CreateReviewDto },
  ): Promise<ReviewEntity> {
    const { dto } = data;
    return await this.appService.createOne(dto);
  }

  @EventPattern('reviews-update-one')
  async updateOne(
    @Payload() data: { id: string; dto: UpdateReviewDto },
  ): Promise<void> {
    const { id, dto } = data;
    return await this.appService.updateOne(id, dto);
  }

  @EventPattern('reviews-delete-one')
  async deleteOne(@Payload() data: { id: string }): Promise<void> {
    const { id } = data;
    return await this.appService.deleteOne(id);
  }
}
