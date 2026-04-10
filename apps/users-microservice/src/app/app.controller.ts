import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/user-create.dto';
import { UserValidateCredentialsDto } from './dto/user-validate-credentials.dto';
import { UpdateUserDto } from './dto/user-update.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('users-find-all')
  async findAll(): Promise<UserEntity[]> {
    return await this.appService.findAll();
  }

  @MessagePattern('users-find-one')
  async findOne(@Payload() data: { id: string }): Promise<UserEntity> {
    const { id } = data;
    return await this.appService.findOne(id);
  }

  @MessagePattern('users-create-one')
  async createOne(
    @Payload() data: { dto: CreateUserDto },
  ): Promise<UserEntity> {
    const { dto } = data;
    return await this.appService.createOne(dto);
  }

  @MessagePattern('users-validate-credentials')
  async validateCredentials(
    @Payload() data: { dto: UserValidateCredentialsDto },
  ): Promise<UserEntity> {
    const { dto } = data;
    return await this.appService.validateCredentials(dto);
  }

  @EventPattern('users-update-one')
  async updateOne(
    @Payload() data: { id: string; dto: UpdateUserDto },
  ): Promise<void> {
    const { id, dto } = data;
    return await this.appService.updateOne(id, dto);
  }

  @EventPattern('users-delete-one')
  async deleteOne(@Payload() data: { id: string }): Promise<void> {
    const { id } = data;
    return await this.appService.deleteOne(id);
  }
}
