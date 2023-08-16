import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/Entitys/users.entity';

@Controller('user-history')
export class UserHistoryController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':userId')
  async getUserHistory(@Param('userId') userId: User) {
    return this.usersService.getUserHistory(userId);
  }
}
