import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() CreateUserDto: CreateUserDto) {
    return await this.usersService.createUser(CreateUserDto);
  }

  @Get()
  async findMany() {
    return await this.usersService.findMany();
  }

  @Get(':id')
  update(@Param('id') id: number) {
    return this.usersService.findManys(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: CreateUserDto,
  ) {
    return await this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.usersService.deleteUser(id);
  }
}
