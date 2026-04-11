import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthTokensDto } from './dto/auth-tokens.dto';
import { firstValueFrom } from 'rxjs';
import { AuthPayloadDto } from './dto/auth-payload.dto';
import { AuthRefreshDto } from './dto/auth-refresh.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(String(process.env.RABBITMQ_AUTH_CLIENT))
    private readonly client: ClientProxy,
  ) {}

  async generateTokens(dto: AuthLoginDto): Promise<AuthTokensDto> {
    return await firstValueFrom(
      this.client.send('auth-generate-tokens', { dto }),
    );
  }

  async access(accessToken: string): Promise<AuthPayloadDto> {
    return await firstValueFrom(
      this.client.send('auth-access', { accessToken }),
    );
  }

  async refresh(refreshToken: string): Promise<AuthRefreshDto> {
    return await firstValueFrom(
      this.client.send('auth-refresh', { refreshToken }),
    );
  }
}
