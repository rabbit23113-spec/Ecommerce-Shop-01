import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
      ClientsModule.register([
        {
          name: String(process.env.RABBITMQ_PRODUCTS_CLIENT),
          transport: Transport.RMQ,
          options: {
            urls: [String(process.env.RABBITMQ_URL)],
            queue: process.env.RABBITMQ_PRODUCTS_QUEUE,
            queueOptions: {
              durable: true,
            },
          },
        },
      ]),
    ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
