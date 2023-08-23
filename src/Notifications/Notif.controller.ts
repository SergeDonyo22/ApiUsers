import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { NotifService } from './Notif.service';

@Controller('user-history')
export class NotifController {
  constructor(private readonly notifService: NotifService) {}

  @Get(':userId')
  async getUserHistory(@Param('userId') userId: number) {
    return this.notifService.getUserHistory(userId)
  }

  @Get()
  async getUserHistorys(){
    return this.notifService.getUserHistorys()
  }
}
