import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandResponseDto } from './dto/brand-response.dto';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  async findAll(): Promise<BrandResponseDto[]> {
    return await this.brandService.findAll();
  }

  @Get(':id')
  async findOne(@Body() body: { id: string }): Promise<BrandResponseDto> {
    const { id } = body;
    return await this.brandService.findOne(id);
  }

  @Post('create')
  async createOne(@Body() dto: CreateBrandDto): Promise<void> {
    return await this.brandService.createOne(dto);
  }

  @Patch('update/:id')
  async updateOne(@Param('id') id: string, @Body() dto: UpdateBrandDto): Promise<void> {
    return await this.brandService.updateOne(id, dto);
  }

  @Delete('delete/:id')
  async deleteOne(@Param('id') id: string): Promise<void> {
    return await this.brandService.deleteOne(id);
  }
}
