export class UserResponseDto {
  user: {
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
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}
