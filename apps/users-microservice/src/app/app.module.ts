import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
