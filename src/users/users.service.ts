import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { email } });
    }

    createUser(createUserDto: CreateUserDto): string {
        const { email, password, firstName, lastName } = createUserDto
        return `create user ${firstName} ${lastName} -- ${email} ${password}`;
    }

}
