export class ProductDto {
  id: string;
  name: string;
  description: string;
  brandId: string;
  categoryId: string;
  imageUrl: string;
  reviewIds: string[];
  price: number;
  createdAt: Date;
  updatedAt: Date;
}
