import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthTokensDto } from './dto/auth-tokens.dto';
import { AuthPayloadDto } from './dto/auth-payload.dto';
import { AuthRefreshDto } from './dto/auth-refresh.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('auth-generate-tokens')
  generateTokens(@Payload() data: { dto: AuthLoginDto }): AuthTokensDto {
    const { dto } = data;
    return this.appService.generateTokens(dto);
  }

  @MessagePattern('auth-access')
  access(@Payload() data: { accessToken: string }): AuthPayloadDto {
    const { accessToken } = data;
    return this.appService.access(accessToken);
  }
  @MessagePattern('auth-refresh')
  refresh(@Payload() data: { refreshToken: string }): AuthRefreshDto {
    const { refreshToken } = data;
    return this.appService.refresh(refreshToken);
  }
}
