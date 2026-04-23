export class ProductResponseDto {
  id: string;
  name: string;
  description: string;
  brandId: string;
  categoryId: string;
  reviewIds: string[];
  price: number;
  createdAt: Date;
  updatedAt: Date;
}
