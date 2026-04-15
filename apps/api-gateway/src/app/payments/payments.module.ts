import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
      ClientsModule.register([
        {
          name: String(process.env.RABBITMQ_PAYMENTS_CLIENT),
          transport: Transport.RMQ,
          options: {
            urls: [String(process.env.RABBITMQ_URL)],
            queue: process.env.RABBITMQ_PAYMENTS_QUEUE,
            queueOptions: {
              durable: true,
            },
          },
        },
      ]),
    ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
