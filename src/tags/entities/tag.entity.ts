import { ApiProperty } from '@nestjs/swagger';
import { Tag } from '@prisma/client';
import { NoteEntity } from 'src/notes/entities/note.entity';

export class TagEntity implements Tag {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  notes: NoteEntity[];
}
