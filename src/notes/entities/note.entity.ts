import { ApiProperty } from "@nestjs/swagger";
import { Note } from "@prisma/client";
import { UserEntity } from "src/users/entity/user.entity";

export class NoteEntity implements Note {
    constructor({ user, ...data }: Partial<NoteEntity>) {
        Object.assign(this, data);
        this.user = new UserEntity(user);
    }
    
    @ApiProperty()
    id: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    content: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    userId: string;

    @ApiProperty({ type: UserEntity })
    user: UserEntity
}
