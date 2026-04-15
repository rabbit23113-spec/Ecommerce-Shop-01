import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
      ClientsModule.register([
        {
          name: String(process.env.RABBITMQ_ORDERS_CLIENT),
          transport: Transport.RMQ,
          options: {
            urls: [String(process.env.RABBITMQ_URL)],
            queue: process.env.RABBITMQ_ORDERS_QUEUE,
            queueOptions: {
              durable: true,
            },
          },
        },
      ]),
    ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
