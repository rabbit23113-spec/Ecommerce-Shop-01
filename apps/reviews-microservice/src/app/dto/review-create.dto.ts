import { Rate } from './review.dto';

export class CreateReviewDto {
  userId: string;
  productId: string;
  description: string;
  rate: Rate;
}
