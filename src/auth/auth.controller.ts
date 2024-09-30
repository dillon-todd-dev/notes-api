import { Body, Controller, InternalServerErrorException, Post, Res } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto, @Res() res: Response): Promise<void> {
        try {
            const { user, token } = await this.authService.register(createUserDto);
            delete user.password;
            res.status(201).send({ user, token });
        } catch (error: unknown) {
            throw new InternalServerErrorException(error);
        }
    }

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response): Promise<void> {
        try {
            const { user, token } = await this.authService.login(loginUserDto);
            delete user.password;
            res.send({ user, token });
        } catch (error: unknown) {
            throw new InternalServerErrorException(error);
        }
    }
}
