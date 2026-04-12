import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: process.env.CART_DATABASE_USERNAME,
      password: process.env.CART_DATABASE_PASSWORD,
      database: process.env.CART_DATABASE_NAME,
      host: process.env.CART_DATABASE_HOST,
      port: Number(process.env.CART_DATABASE_PORT),
      entities: [CartEntity],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([CartEntity]),
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
