import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryResponseDto } from './dto/category-response.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll(): Promise<CategoryResponseDto[]> {
    return await this.categoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CategoryResponseDto> {
    return await this.categoryService.findOne(id);
  }

  @Post('create')
  async createOne(@Body() dto: CreateCategoryDto): Promise<void> {
    return await this.categoryService.createOne(dto);
  }

  @Patch('update/:id')
  async updateOne(
    @Param('id') id: string,
    @Body() dto: UpdateCategoryDto,
  ): Promise<void> {
    return await this.categoryService.updateOne(id, dto);
  }

  @Delete('delete/:id')
  async deleteOne(@Param('id') id: string): Promise<void> {
    return await this.categoryService.deleteOne(id);
  }
}
