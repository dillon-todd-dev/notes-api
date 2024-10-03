import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { NotesModule } from './notes/notes.module';
import { TagsModule } from './tags/tags.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, NotesModule, TagsModule, EmailModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
