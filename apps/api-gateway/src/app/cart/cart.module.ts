import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
      ClientsModule.register([
        {
          name: String(process.env.RABBITMQ_CART_CLIENT),
          transport: Transport.RMQ,
          options: {
            urls: [String(process.env.RABBITMQ_URL)],
            queue: process.env.RABBITMQ_CART_QUEUE,
            queueOptions: {
              durable: true,
            },
          },
        },
      ]),
    ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
