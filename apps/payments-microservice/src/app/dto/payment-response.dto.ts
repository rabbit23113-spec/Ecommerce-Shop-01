import { Status } from '../entities/payment.entity';

export class PaymentResponseDto {
  id: string;
  userId: string;
  orderId: string;
  status: Status;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}
