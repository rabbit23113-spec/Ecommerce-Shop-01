import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CategoryEntity } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('category-find-all')
  async findAll(): Promise<CategoryEntity[]> {
    return await this.appService.findAll();
  }

  @MessagePattern('category-find-one')
  async findOne(@Payload() data: { id: string }): Promise<CategoryEntity> {
    const { id } = data;
    return await this.appService.findOne(id);
  }

  @EventPattern('category-create-one')
  async createOne(@Payload() data: { dto: CreateCategoryDto }): Promise<void> {
    const { dto } = data;
    return await this.appService.createOne(dto);
  }

  @EventPattern('category-update-one')
  async updateOne(
    @Payload() data: { id: string; dto: UpdateCategoryDto },
  ): Promise<void> {
    const { id, dto } = data;
    return await this.appService.updateOne(id, dto);
  }

  @EventPattern('category-delete-one')
  async deleteOne(@Payload() data: { id: string }): Promise<void> {
    const { id } = data;
    return await this.appService.deleteOne(id);
  }
}
