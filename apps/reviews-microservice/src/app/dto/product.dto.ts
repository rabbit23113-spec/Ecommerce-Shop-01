export class ProductDto {
  id: string;
  name: string;
  description: string;
  brandId: string;
  categoryid: string;
  reviewIds: string[];
  price: number;
  createdAt: Date;
  updatedAt: Date;
}
