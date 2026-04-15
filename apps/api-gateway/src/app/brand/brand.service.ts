import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { BrandResponseDto } from './dto/brand-response.dto';
import { firstValueFrom } from 'rxjs';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandService {
  constructor(
    @Inject((process.env.RABBITMQ_BRAND_CLIENT = 'rabbitmq-brand-client'))
    private readonly brandClient: ClientProxy,
  ) {}

  async findAll(): Promise<BrandResponseDto[]> {
    return await firstValueFrom(this.brandClient.send('brand-find-all', {}));
  }

  async findOne(id: string): Promise<BrandResponseDto> {
    return await firstValueFrom(
      this.brandClient.send('brand-find-one', { id }),
    );
  }

  async createOne(dto: CreateBrandDto): Promise<void> {
    return await firstValueFrom(
      this.brandClient.emit('brand-create-one', { dto }),
    );
  }

  async updateOne(id: string, dto: UpdateBrandDto): Promise<void> {
    return await firstValueFrom(
      this.brandClient.emit('brand-update-one', { id, dto }),
    );
  }

  async deleteOne(id: string): Promise<void> {
    return await firstValueFrom(
      this.brandClient.emit('brand-delete-one', { id }),
    );
  }
}
