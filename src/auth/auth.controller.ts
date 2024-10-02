import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './entity/auth.entity';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiCreatedResponse({ type: AuthEntity })
    @Post('register')
    async register(@Body() createUserDto: CreateUserDto): Promise<AuthEntity> {
        const { token, user } = await this.authService.register(createUserDto);
        return { accessToken: token, user: user };
    }

    @ApiCreatedResponse({ type: AuthEntity })
    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto): Promise<AuthEntity> {
        const { token, user } = await this.authService.login(loginUserDto);
        return { accessToken: token, user: user };
    }
}
