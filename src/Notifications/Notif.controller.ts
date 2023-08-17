import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Controller('user-history')
export class UserHistoryController {
  constructor(private readonly userService: UsersService) {}

  @Get(':userId')
  async getUserHistory(@Param('userId') userId: number) {
    return this.userService.getUserHistory(userId);
  }
}
