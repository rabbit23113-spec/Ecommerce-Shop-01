import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentResponseDto, Status } from './dto/payment-response.dto';
import { CreatePaymentDto } from './dto/payment-create.dto';
import { UpdatePaymentDto } from './dto/payment-update.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  async findAll(): Promise<PaymentResponseDto[]> {
    return await this.paymentsService.findAll();
  }

  @Get('find/:id')
  async findOne(@Param('id') id: string): Promise<PaymentResponseDto> {
    return await this.paymentsService.findOne(id);
  }

  @Get('user/:id')
  async findByUserId(@Param('id') id: string): Promise<PaymentResponseDto[]> {
    return await this.paymentsService.findByUserId(id);
  }

  @Get('order/:id')
  async findByOrderId(@Param('id') id: string): Promise<PaymentResponseDto[]> {
    return await this.paymentsService.findByOrderId(id);
  }

  @Post('create')
  async createOne(@Body() dto: CreatePaymentDto): Promise<PaymentResponseDto> {
    return await this.paymentsService.createOne(dto);
  }

  @Patch('update/:id')
  async updateOne(
    @Param('id') id: string,
    @Body() dto: UpdatePaymentDto,
  ): Promise<void> {
    return await this.paymentsService.updateOne(id, dto);
  }

  @Patch('status/:id')
  async updateStatus(
    @Param('id') id: string,
    @Query('status') status: Status,
  ): Promise<void> {
    return await this.paymentsService.updateStatus(id, status);
  }

  @Delete('delete/:id')
  async deleteOne(@Param('id') id: string): Promise<void> {
    return await this.paymentsService.deleteOne(id);
  }
}
