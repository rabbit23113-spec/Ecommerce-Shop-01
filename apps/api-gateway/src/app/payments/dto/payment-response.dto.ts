export enum Status {
  SUCCESS = 'success',
  PENDING = 'pending',
  CANCELLED = 'cancelled',
}

export class PaymentResponseDto {
  id: string;
  userId: string;
  orderId: string;
  status: Status;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}
