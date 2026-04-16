import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResponseDto } from './dto/product-response.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(): Promise<ProductResponseDto[]> {
    return await this.productService.findAll();
  }

  @Get('find/:id')
  async findOne(@Param('id') id: string): Promise<ProductResponseDto> {
    return await this.productService.findOne(id);
  }

  @Get('category/:id')
  async findByCategoryId(
    @Param('id') id: string,
  ): Promise<ProductResponseDto[]> {
    return await this.productService.findByCategoryId(id);
  }

  @Get('brand/:id')
  async findByBrandId(@Param('id') id: string): Promise<ProductResponseDto[]> {
    return await this.productService.findByBrandId(id);
  }

  @Post('create')
  async createOne(@Body() dto: CreateProductDto): Promise<ProductResponseDto> {
    return await this.productService.createOne(dto);
  }

  @Patch('update/:id')
  async updateOne(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
  ): Promise<void> {
    return await this.productService.updateOne(id, dto);
  }

  @Delete('delete/:id')
  async deleteOne(@Param('id') id: string): Promise<void> {
    return await this.productService.deleteOne(id);
  }
}
