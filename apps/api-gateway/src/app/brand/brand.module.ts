import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: String(process.env.RABBITMQ_BRAND_CLIENT),
        transport: Transport.RMQ,
        options: {
          urls: [String(process.env.RABBITMQ_URL)],
          queue: process.env.RABBITMQ_BRAND_QUEUE,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [BrandController],
  providers: [BrandService],
})
export class BrandModule {}
