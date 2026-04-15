import { Status } from '../entities/order.entity';

export class OrderResponseDto {
  id: string;
  userId: string;
  productIds: string[];
  paymentId: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
}
