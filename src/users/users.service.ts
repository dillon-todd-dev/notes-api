import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { email } });
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const { password } = createUserDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        return await this.prisma.user.create({
            data: {
                ...createUserDto,
                password: hashedPassword
            }
        })
    }
}
