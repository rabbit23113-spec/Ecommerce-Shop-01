import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserResponseDto } from './dto/user-response.dto';
import { CreateUserDto } from './dto/user-create.dto';
import { UserValidateCredentialsDto } from './dto/user-validate-credentials.dto';
import { UpdateUserDto } from './dto/user-update.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<UserResponseDto[]> {
    return await this.usersService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    return await this.usersService.findOne(id);
  }
  @Post('create')
  async createOne(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    return await this.usersService.createOne(dto);
  }
  @Post('validate')
  async validateCredentials(
    @Body() dto: UserValidateCredentialsDto,
  ): Promise<UserResponseDto> {
    return await this.usersService.validateCredentials(dto);
  }
  @Patch('update/:id')
  async updateOne(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<void> {
    return await this.usersService.updateOne(id, dto);
  }
  @Delete('delete/:id')
  async deleteOne(@Param('id') id: string): Promise<void> {
    return await this.usersService.deleteOne(id);
  }
}
