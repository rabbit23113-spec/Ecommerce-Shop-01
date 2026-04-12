import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: process.env.CATEGORY_DATABASE_USERNAME,
      password: process.env.CATEGORY_DATABASE_PASSWORD,
      database: process.env.CATEGORY_DATABASE_NAME,
      host: process.env.CATEGORY_DATABASE_HOST,
      port: Number(process.env.CATEGORY_DATABASE_PORT),
      entities: [CategoryEntity],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([CategoryEntity]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
