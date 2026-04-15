import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from './entities/payment.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: process.env.PAYMENTS_DATABASE_USERNAME,
      password: process.env.PAYMENTS_DATABASE_PASSWORD,
      database: process.env.PAYMENTS_DATABASE_NAME,
      host: process.env.PAYMENTS_DATABASE_HOST,
      port: Number(process.env.PAYMENTS_DATABASE_PORT),
      entities: [PaymentEntity],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([PaymentEntity]),
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
    ClientsModule.register([
      {
        name: String(process.env.RABBITMQ_USERS_CLIENT),
        transport: Transport.RMQ,
        options: {
          urls: [String(process.env.RABBITMQ_URL)],
          queue: process.env.RABBITMQ_USERS_QUEUE,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
