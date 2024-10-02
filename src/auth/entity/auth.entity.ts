import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/users/entity/user.entity';

export class AuthEntity {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  user: UserEntity;
}
