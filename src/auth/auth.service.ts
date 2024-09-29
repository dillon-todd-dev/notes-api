import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    register(createUserDto: CreateUserDto): string {
        return this.usersService.createUser(createUserDto);
    }
}
