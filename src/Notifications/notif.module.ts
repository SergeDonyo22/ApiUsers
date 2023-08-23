import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotifController } from './Notif.controller';
import { NotifService } from './Notif.service';
import { NotificationEntity } from './EntitysNotif/notification.entity';
import { UsersModule } from 'src/users/users.module';
@Module({
  imports: [TypeOrmModule.forFeature([NotificationEntity]), UsersModule],
  controllers: [NotifController],
  providers: [NotifService],
  exports: [NotifService]
})
export class NotifModule {}
