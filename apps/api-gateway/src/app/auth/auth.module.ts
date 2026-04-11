import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: String(process.env.RABBITMQ_AUTH_CLIENT),
        transport: Transport.RMQ,
        options: {
          urls: [String(process.env.RABBITMQ_URL)],
          queue: process.env.RABBITMQ_AUTH_QUEUE,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
