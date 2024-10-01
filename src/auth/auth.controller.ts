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
        try {
            const token = await this.authService.register(createUserDto);
            res.status(201).send({ accessToken: token });
        } catch (error: unknown) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    this.logger.log(`User already exists with email: ${createUserDto.email}`)
                }
                this.logger.log(error.message);
                res.status(400).send({ error: 'user_already_exists'});
            } else {
                throw new InternalServerErrorException(error);
            }
        }
    }

    @ApiCreatedResponse({ type: AuthEntity })
    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response): Promise<void> {
        try {
            const token = await this.authService.login(loginUserDto);
            res.send({ accessToken: token });
        } catch (error: unknown) {
            this.logger.error(error);
            throw new InternalServerErrorException(error);
        }
    }
}
