import { Controller, Delete, Get, Param } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    async findall() {
        return await this.usersService.findAll();
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.usersService.delete(id);
    }
}