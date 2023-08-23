import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './Entitys/users.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { NotificationEntity} from '../Notifications/EntitysNotif/notification.entity';
import { NotifModule } from 'src/Notifications/notif.module';
import { NotifService } from 'src/Notifications/Notif.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, NotificationEntity])],
  controllers: [UsersController],
  providers: [UsersService, NotifService],
  exports: [UsersService],
})
export class UsersModule {}
