import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ReviewEntity } from './entities/review.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: process.env.REVIEWS_DATABASE_USERNAME,
      password: process.env.REVIEWS_DATABASE_PASSWORD,
      database: process.env.REVIEWS_DATABASE_NAME,
      host: process.env.REVIEWS_DATABASE_HOST,
      port: Number(process.env.REVIEWS_DATABASE_PORT),
      entities: [ReviewEntity],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([ReviewEntity]),
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
