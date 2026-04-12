import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { BrandEntity } from './entities/brand.entity';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern('brand-find-all')
  async findAll(): Promise<BrandEntity[]> {
    return await this.appService.findAll();
  }

  @MessagePattern('brand-find-one')
  async findOne(@Payload() data: { id: string }): Promise<BrandEntity> {
    const { id } = data;
    return await this.appService.findOne(id);
  }

  @EventPattern('brand-create-one')
  async createOne(@Payload() data: { dto: CreateBrandDto }): Promise<void> {
    const { dto } = data;
    return await this.appService.createOne(dto);
  }

  @EventPattern('brand-update-one')
  async updateOne(
    @Payload() data: { id: string; dto: UpdateBrandDto },
  ): Promise<void> {
    const { id, dto } = data;
    return await this.appService.updateOne(id, dto);
  }

  @EventPattern('brand-delete-one')
  async deleteOne(@Payload() data: { id: string }): Promise<void> {
    const { id } = data;
    return await this.appService.deleteOne(id);
  }
}
