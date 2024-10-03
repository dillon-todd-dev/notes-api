import { Injectable, Logger } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Tag } from '@prisma/client';

@Injectable()
export class TagsService {
  private readonly logger: Logger = new Logger(TagsService.name);

  constructor(private prisma: PrismaService) {}

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    const tag = await this.prisma.tag.create({
      data: {
        name: createTagDto.name,
        notes: {
          connect: {
            id: createTagDto.noteId
          }
        }
      },
      include: {
        notes: true
      }
    });
    this.logger.debug(`created tag: ${tag.name}`);
    return tag;
  }

  async findAll(): Promise<Tag[]> {
    return this.prisma.tag.findMany({
      include: {
        notes: true
      }
    });
  }

  async remove(id: string) {
    const tag = await this.prisma.tag.delete({ where: { id }, include: { notes: true } });
    this.logger.debug(`deleted tag: ${tag.name}`);
    return tag;
  }
}
