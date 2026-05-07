import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthTokensDto } from './dto/auth-tokens.dto';
import { AuthPayloadDto } from './dto/auth-payload.dto';
import { AuthRefreshDto } from './dto/auth-refresh.dto';

@Injectable()
export class AppService {
  constructor(@Inject(JwtService) private readonly jwtService: JwtService) {}

  generateTokens(dto: AuthLoginDto): AuthTokensDto {
    const { id } = dto;
    const accessToken: string = this.jwtService.sign(
      { sub: id },
      { secret: process.env.SECRET_KEY, expiresIn: '15m' },
    );
    const refreshToken: string = this.jwtService.sign(
      { sub: id },
      { secret: process.env.SECRET_KEY, expiresIn: '7d' },
    );
    const tokens: AuthTokensDto = {
      accessToken,
      refreshToken,
    };
    return tokens;
  }

  access(accessToken: string): AuthPayloadDto {
    const payload: AuthPayloadDto = this.jwtService.verify(accessToken, {
      secret: process.env.SECRET_KEY,
    });
    if (!payload) throw new UnauthorizedException({ message: 'Invalid token' });
    return payload;
  }
  refresh(refreshToken: string): AuthRefreshDto {
    const payload: AuthPayloadDto = this.jwtService.verify(refreshToken, {
      secret: process.env.SECRET_KEY,
    });
    if (!payload) throw new UnauthorizedException({ message: 'Invalid token' });
    const { sub } = payload;
    const accessToken: string = this.jwtService.sign(
      { sub },
      { secret: process.env.SECRET_KEY, expiresIn: '15m' },
    );
    const tokensWithRefreshedAccessToken: AuthRefreshDto = {
      accessToken,
      refreshToken,
    };
    return tokensWithRefreshedAccessToken;
  }
}
