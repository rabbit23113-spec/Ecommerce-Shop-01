export enum Status {
  ACTIVE = 'active',
  CANCELLED = 'cancelled',
}
export class OrderResponseDto {
  id: string;
  userId: string;
  productIds: string[];
  paymentId: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
}
