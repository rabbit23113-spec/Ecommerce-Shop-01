import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserResponseDto } from './dto/user-response.dto';
import { firstValueFrom } from 'rxjs';
import { CreateUserDto } from './dto/user-create.dto';
import { UserValidateCredentialsDto } from './dto/user-validate-credentials.dto';
import { UpdateUserDto } from './dto/user-update.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(String(process.env.RABBITMQ_USERS_CLIENT))
    private readonly client: ClientProxy,
  ) {}

  async findAll(): Promise<UserResponseDto[]> {
    const response: UserResponseDto[] = await firstValueFrom(
      this.client.send('users-find-all', {}),
    );
    return response;
  }
  async findOne(id: string): Promise<UserResponseDto> {
    const response: UserResponseDto = await firstValueFrom(
      this.client.send('users-find-one', { id }),
    );
    return response;
  }
  async createOne(dto: CreateUserDto): Promise<UserResponseDto> {
    const response: UserResponseDto = await firstValueFrom(
      this.client.send('users-create-one', { dto }),
    );
    return response;
  }
  async validateCredentials(
    dto: UserValidateCredentialsDto,
  ): Promise<UserResponseDto> {
    const response: UserResponseDto = await firstValueFrom(
      this.client.send('users-validate-credentials', { dto }),
    );
    return response;
  }
  async updateOne(id: string, dto: UpdateUserDto): Promise<void> {
    return await firstValueFrom(
      this.client.emit('users-update-one', { id, dto }),
    );
  }
  async deleteOne(id: string): Promise<void> {
    return await firstValueFrom(this.client.emit('users-delete-one', { id }));
  }
}
