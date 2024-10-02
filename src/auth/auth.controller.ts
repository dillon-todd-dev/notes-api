import { Body, Controller, InternalServerErrorException, Logger, Post, Res } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { Response } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './entity/auth.entity';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    private readonly logger: Logger = new Logger(AuthController.name);

    constructor(private authService: AuthService) {}

    @ApiCreatedResponse({ type: AuthEntity })
    @Post('register')
    async register(@Body() createUserDto: CreateUserDto, @Res() res: Response): Promise<void> {
        const token = await this.authService.register(createUserDto);
        res.status(201).send({ accessToken: token });
    }

    @ApiCreatedResponse({ type: AuthEntity })
    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response): Promise<void> {
        const token = await this.authService.login(loginUserDto);
        res.send({ accessToken: token });
    }
}
