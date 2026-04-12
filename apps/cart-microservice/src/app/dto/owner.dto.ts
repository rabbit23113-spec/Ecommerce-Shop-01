export class OwnerDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: {
    country: string;
    city: string;
  };
  orders: [];
  roles: string[];
  createdAt: Date;
  updatedAt: Date;
}
