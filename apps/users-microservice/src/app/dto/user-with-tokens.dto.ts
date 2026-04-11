import { UserEntity } from '../entities/user.entity';
import { UserTokensDto } from './user-tokens.dto';

export class UserWithTokensDto {
  user: UserEntity;
  tokens: UserTokensDto;
}
