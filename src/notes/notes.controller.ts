import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards, Logger } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { NoteEntity } from './entities/note.entity';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Note } from '@prisma/client';

@Controller('notes')
@ApiTags('notes')
export class NotesController {
  private readonly logger: Logger = new Logger(NotesController.name);

  constructor(private readonly notesService: NotesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: NoteEntity })
  async create(@Body() createNoteDto: CreateNoteDto) {
    this.logger.log(`create note: ${createNoteDto.title} -- ${createNoteDto.content} -- ${createNoteDto.userId}`);
    const note = await this.notesService.create(createNoteDto);
    return new NoteEntity(note);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: NoteEntity, isArray: true })
  async findAll() {
    const notes = await this.notesService.findAll();
    return notes.map((note: Note) => new NoteEntity(note));
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: NoteEntity })
  async remove(@Param('id') id: string) {
    const note = await this.notesService.delete(id);
    return new NoteEntity(note);
  }
}
