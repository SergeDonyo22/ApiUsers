import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, QueryRunner } from 'typeorm';
import { NotificationEntity} from 'src/Notifications/EntitysNotif/notification.entity';
import { User } from 'src/users/Entitys/users.entity';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { CreateNotifDto } from './dtos/message-user.dto';

@Injectable()
export class NotifService{
  constructor(private readonly connection: Connection,) {}
 
  async getUserNotification(
    queryRunner: QueryRunner,
    Notificationdto: CreateNotifDto,
    user: User,
  ) {
    try {
      const notification = new NotificationEntity()
      notification.action = Notificationdto.action
      notification.user = user

      queryRunner.manager.save(notification)
    }catch(error){
      console.error(error)
      if (error instanceof BadRequestException){
        throw error
      }else {
        throw new InternalServerErrorException('Notification create failed')
      }
    }
  }
  async getUserHistorys(){
    return this.connection.manager.find(NotificationEntity)
  }

  async getUserHistory(id: number){
    return this.connection.manager.findOne(User, {where: { id }})
  }
}
