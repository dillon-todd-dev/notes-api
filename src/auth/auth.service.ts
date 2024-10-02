import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/users/entity/user.entity';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(
    createUserDto: CreateUserDto,
  ): Promise<{ token: string; user: UserEntity }> {
    const user = await this.usersService.create(createUserDto);
    const payload = { email: user.email, sub: user.id };
    const token = await this.jwtService.signAsync(payload);
    return { token, user: new UserEntity(user) };
  }

  async login(
    loginUserDto: LoginUserDto,
  ): Promise<{ token: string; user: UserEntity }> {
    const { email, password } = loginUserDto;
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      this.logger.log(`Unable to find user with email: ${loginUserDto.email}`);
      throw new NotFoundException('User not found');
    }
    this.logger.debug(`found user with email: ${loginUserDto.email}`);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      this.logger.log('incorrect password');
      throw new UnauthorizedException('invalid_credentials');
    }

    const payload = { email, sub: user.id };
    const token = await this.jwtService.signAsync(payload);
    return { token, user: new UserEntity(user) };
  }
}
