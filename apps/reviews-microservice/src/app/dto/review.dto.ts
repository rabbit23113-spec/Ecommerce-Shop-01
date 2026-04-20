export enum Rate {
  EXCELLENT = 5,
  GOOD = 4,
  AVERAGE = 3,
  POOR = 2,
  TERRIBLE = 1,
}

export class ReviewDto {
  id: string;
  userId: string;
  productId: string;
  description: string;
  rate: Rate;
  createdAt: Date;
  updatedAt: Date;
}
