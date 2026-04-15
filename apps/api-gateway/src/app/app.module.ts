import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BrandModule } from './brand/brand.module';
import { CategoryModule } from './category/category.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [UsersModule, AuthModule, BrandModule, CategoryModule, OrdersModule, PaymentsModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
