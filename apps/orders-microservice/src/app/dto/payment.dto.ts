export enum Status {
  SUCCESS = 'success',
  PENDING = 'pending',
  CANCELLED = 'cancelled',
}

export class PaymentDto {
  id: string;
  userId: string;
  orderId: string;
  status: Status;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}
