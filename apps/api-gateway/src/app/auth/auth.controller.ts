import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthTokensDto } from './dto/auth-tokens.dto';
import { AuthPayloadDto } from './dto/auth-payload.dto';
import { AuthRefreshDto } from './dto/auth-refresh.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('generate')
  async generateTokens(@Body() dto: AuthLoginDto): Promise<AuthTokensDto> {
    return await this.authService.generateTokens(dto);
  }

  @Post('access')
  async access(@Body() body: { accessToken: string }): Promise<AuthPayloadDto> {
    const { accessToken } = body;
    return await this.authService.access(accessToken);
  }

  @Post('refresh')
  async refresh(@Body() body: { refreshToken: string }): Promise<AuthRefreshDto> {
    const { refreshToken } = body;
    return await this.authService.refresh(refreshToken);
  }
}
