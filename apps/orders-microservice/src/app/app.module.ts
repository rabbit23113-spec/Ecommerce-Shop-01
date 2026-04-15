import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: process.env.ORDERS_DATABASE_USERNAME,
      password: process.env.ORDERS_DATABASE_PASSWORD,
      database: process.env.ORDERS_DATABASE_NAME,
      host: process.env.ORDERS_DATABASE_HOST,
      port: Number(process.env.ORDERS_DATABASE_PORT),
      entities: [OrderEntity],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([OrderEntity]),
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
