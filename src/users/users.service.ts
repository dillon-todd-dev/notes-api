import { Injectable, Logger } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private readonly logger: Logger = new Logger(UsersService.name);

  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    this.logger.debug(`found user: ${user.email}`);
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });
    this.logger.debug(`created user: ${user.email}`);
    return user;
  }

  async update(updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id: updateUserDto.id },
      data: updateUserDto,
    });
    this.logger.debug(`updated user: ${user.email}`);
    return user;
  }

  async delete(id: string): Promise<User> {
    const user = await this.prisma.user.delete({ where: { id } });
    this.logger.debug(`deleted user: ${user.email}`);
    return user;
  }
}
