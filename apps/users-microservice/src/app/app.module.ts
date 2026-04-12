import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: process.env.USERS_DATABASE_USERNAME,
      password: process.env.USERS_DATABASE_PASSWORD,
      database: process.env.USERS_DATABASE_NAME,
      host: process.env.USERS_DATABASE_HOST,
      port: Number(process.env.USERS_DATABASE_PORT),
      entities: [UserEntity],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([UserEntity]),
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
