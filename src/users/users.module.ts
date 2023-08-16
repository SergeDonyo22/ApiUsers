import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './Entitys/users.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Notification } from '../Notifications/EntitysNotif/notification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Notification])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
