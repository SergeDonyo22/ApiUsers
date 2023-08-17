import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from 'src/Notifications/EntitysNotif/notification.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Notification)
    private readonly userHistoryRepository: Repository<Notification>,
  ) {}

  async getUserNotification(userId: number): Promise<Notification[]> {
    return this.userHistoryRepository.find({ where: { id: userId } });
  }
}

export { Notification };
