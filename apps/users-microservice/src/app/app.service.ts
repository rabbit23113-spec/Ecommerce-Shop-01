import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user-create.dto';
import bcrypt from 'bcrypt';
import { UserValidateCredentialsDto } from './dto/user-validate-credentials.dto';
import { UpdateUserDto } from './dto/user-update.dto';
import { ClientProxy } from '@nestjs/microservices';
import { UserTokensDto } from './dto/user-tokens.dto';
import { firstValueFrom } from 'rxjs';
import { UserWithTokensDto } from './dto/user-with-tokens.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @Inject(process.env.RABBITMQ_AUTH_CLIENT)
    private readonly authClient: ClientProxy,
  ) {}
  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }
  async findOne(id: string): Promise<UserEntity> {
    const candidate: UserEntity | null = await this.userRepository.findOneBy({
      id,
    });
    if (!candidate)
      throw new NotFoundException({ message: 'The user is not existing' });
    return candidate;
  }
  async createOne(dto: CreateUserDto): Promise<UserWithTokensDto> {
    const { password } = dto;
    const salt: string = await bcrypt.genSalt(14);
    const hash: string = await bcrypt.hash(password, salt);
    const user: UserEntity = await this.userRepository.create({
      ...dto,
      password: hash,
    });
    await this.userRepository.save(user);
    const tokens: UserTokensDto = await firstValueFrom(this.authClient.send('auth-generate-tokens', { dto: { id: user.id } }));
    const response: UserWithTokensDto = { user, tokens };
    return response;
  }
  async validateCredentials(
    dto: UserValidateCredentialsDto,
  ): Promise<UserWithTokensDto> {
    const { email, password } = dto;
    const candidate: UserEntity | null = await this.userRepository.findOneBy({
      email,
    });
    if (!candidate)
      throw new UnauthorizedException({ message: 'Invalid email or password' });
    const isMatch: boolean = await bcrypt.compare(password, candidate.password);
    if (!isMatch)
      throw new UnauthorizedException({ message: 'Invalid email or password' });
    const tokens: UserTokensDto = await firstValueFrom(this.authClient.send('auth-generate-tokens', { dto: {id: candidate.id } }));
    const response: UserWithTokensDto = { user: candidate, tokens };
    return response;
  }
  async updateOne(id: string, dto: UpdateUserDto): Promise<void> {
    const candidate: UserEntity | null = await this.userRepository.findOneBy({
      id,
    });
    if (!candidate)
      throw new NotFoundException({ message: 'The user is not existing' });
    await this.userRepository.update(id, dto);
  }
  async deleteOne(id: string): Promise<void> {
    const candidate: UserEntity | null = await this.userRepository.findOneBy({
      id,
    });
    if (!candidate)
      throw new NotFoundException({ message: 'The user is not existing' });
    await this.userRepository.delete(candidate.id);
  }
}
