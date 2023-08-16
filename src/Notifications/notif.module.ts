import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/Entitys/users.entity';
import { UserHistoryController } from './Notif.controller';
import { UserService } from './Notif.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserHistoryController],
  providers: [UserService],
})
export class NotifModule {}
