import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
      ClientsModule.register([
        {
          name: String(process.env.RABBITMQ_CATEGORY_CLIENT),
          transport: Transport.RMQ,
          options: {
            urls: [String(process.env.RABBITMQ_URL)],
            queue: process.env.RABBITMQ_CATEGORY_QUEUE,
            queueOptions: {
              durable: true,
            },
          },
        },
      ]),
    ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
