import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandEntity } from './entities/brand.entity';
import { Repository } from 'typeorm';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(BrandEntity)
    private readonly brandRepository: Repository<BrandEntity>,
  ) {}
  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  async findAll(): Promise<BrandEntity[]> {
    return await this.brandRepository.find();
  }

  async findOne(id: string): Promise<BrandEntity> {
    const brand: BrandEntity | null = await this.brandRepository.findOneBy({
      id,
    });
    if (!brand)
      throw new NotFoundException({ message: 'The brand is not existing' });
    return brand;
  }

  async createOne(dto: CreateBrandDto): Promise<void> {
    const brand: BrandEntity = await this.brandRepository.create(dto);
    await this.brandRepository.save(brand);
  }

  async updateOne(id: string, dto: UpdateBrandDto): Promise<void> {
    const brand: BrandEntity | null = await this.brandRepository.findOneBy({
      id,
    });
    if (!brand)
      throw new NotFoundException({ message: 'The brand is not existing' });
    await this.brandRepository.update(id, dto);
  }
  async deleteOne(id: string): Promise<void> {
    const brand: BrandEntity | null = await this.brandRepository.findOneBy({
      id,
    });
    if (!brand)
      throw new NotFoundException({ message: 'The brand is not existing' });
    await this.brandRepository.delete(brand.id);
  }
}
