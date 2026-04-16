import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CategoryResponseDto } from './dto/category-response.dto';
import { firstValueFrom } from 'rxjs';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(process.env.RABBITMQ_CATEGORY_CLIENT)
    private readonly categoryClient: ClientProxy,
  ) {}

  async findAll(): Promise<CategoryResponseDto[]> {
    return await firstValueFrom(
      this.categoryClient.send('category-find-all', {}),
    );
  }

  async findOne(id: string): Promise<CategoryResponseDto> {
    return await firstValueFrom(
      this.categoryClient.send('category-find-one', { id }),
    );
  }

  async createOne(dto: CreateCategoryDto): Promise<void> {
    return await firstValueFrom(
      this.categoryClient.emit('category-create-one', { dto }),
    );
  }

  async updateOne(id: string, dto: UpdateCategoryDto): Promise<void> {
    return await firstValueFrom(
      this.categoryClient.emit('category-update-one', { id, dto }),
    );
  }

  async deleteOne(id: string): Promise<void> {
    return await firstValueFrom(
      this.categoryClient.emit('category-delete-one', { id }),
    );
  }
}
