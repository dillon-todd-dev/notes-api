import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './entity/auth.entity';
import { UserEntity } from 'src/users/entity/user.entity';
import { Request } from 'express';
import { JwtAuthGuard } from './auth.guard';
import { use } from 'passport';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiCreatedResponse({ type: AuthEntity })
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<AuthEntity> {
    const { token, user } = await this.authService.register(createUserDto);
    return { accessToken: token, user: user };
  }

  @ApiOkResponse({ type: AuthEntity })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<AuthEntity> {
    const { token, user } = await this.authService.login(loginUserDto);
    return { accessToken: token, user: user };
  }

  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  @Get('email-confirmation')
  async emailConfirmation(@Query('token') token: string) {
    const user = await this.authService.confirmEmail(token);
    return new UserEntity(user);
  }

  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const user = await this.authService.deleteUser(id);
    return new UserEntity(user);
  }

  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Get('loggedInUser')
  async getLoggedInUser(@Req() req: Request) {
    const user = await this.authService.getLoggedInUser(req);
    return new UserEntity(user);
  }
}
