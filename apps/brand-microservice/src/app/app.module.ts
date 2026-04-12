import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandEntity } from './entities/brand.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: process.env.BRAND_DATABASE_USERNAME,
      password: process.env.BRAND_DATABASE_PASSWORD,
      database: process.env.BRAND_DATABASE_NAME,
      host: process.env.BRAND_DATABASE_HOST,
      port: Number(process.env.BRAND_DATABASE_PORT),
      entities: [BrandEntity],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([BrandEntity]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
