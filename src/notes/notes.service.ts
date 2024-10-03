import { Injectable, Logger } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { Note } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotesService {
  private readonly logger: Logger = new Logger(NotesService.name);

  constructor(private prisma: PrismaService) {}

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    return this.prisma.note.create({
      data: {
        title: createNoteDto.title,
        content: createNoteDto.content,
        userId: createNoteDto.userId,
      },
      include: { user: true, tags: true },
    });
  }

  async findAll(): Promise<Note[]> {
    return this.prisma.note.findMany({ include: { user: true, tags: true } });
  }

  async delete(id: string): Promise<Note> {
    const note = await this.prisma.note.delete({
      where: { id },
      include: { user: true, tags: true },
    });
    this.logger.debug(`deleted note: ${note.title}`);
    return note;
  }
}
