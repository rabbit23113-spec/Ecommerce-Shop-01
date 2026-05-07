export class UserDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: {
    country: string;
    city: string;
  };
  orderIds: string[];
  reviewIds: string[];
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}
