import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async findAll(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.find();
  }

  async findOne(id: string): Promise<CategoryEntity> {
    const category: CategoryEntity | null =
      await this.categoryRepository.findOneBy({
        id,
      });
    if (!category)
      throw new NotFoundException({ message: 'The category is not existing' });
    return category;
  }

  async createOne(dto: CreateCategoryDto): Promise<void> {
    const category: CategoryEntity = await this.categoryRepository.create(dto);
    await this.categoryRepository.save(category);
  }

  async updateOne(id: string, dto: UpdateCategoryDto): Promise<void> {
    const category: CategoryEntity | null =
      await this.categoryRepository.findOneBy({
        id,
      });
    if (!category)
      throw new NotFoundException({ message: 'The category is not existing' });
    await this.categoryRepository.update(id, dto);
  }
  async deleteOne(id: string): Promise<void> {
    const category: CategoryEntity | null =
      await this.categoryRepository.findOneBy({
        id,
      });
    if (!category)
      throw new NotFoundException({ message: 'The category is not existing' });
    await this.categoryRepository.delete(category.id);
  }
}
