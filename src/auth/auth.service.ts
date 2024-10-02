import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    private readonly logger: Logger = new Logger(AuthService.name);

    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async register(createUserDto: CreateUserDto): Promise<string> {
        const user = await this.usersService.createUser(createUserDto);
        const payload = { email: user.email, sub: user.id };
        const token = await this.jwtService.signAsync(payload);
        return token;
    }

    async login(loginUserDto: LoginUserDto): Promise<string> {
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
        return token;
    }
}
