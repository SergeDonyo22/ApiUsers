import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './Entitys/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { Notification } from '../Notifications/EntitysNotif/notification.entity';

@Injectable()
export class UsersService {
  getUserHistory: any;
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Notification)
    private readonly userHistoryRepository: Repository<Notification>,
  ) {}

  async create(dto: CreateUserDto) {
    const user = this.userRepository.create(dto);

    return await this.userRepository.save(user);
  }

  findMany() {
    return this.userRepository.find();
  }

  async update(id: number, dto: CreateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });

    Object.assign(user, dto);

    return await this.userRepository.save(user);
  }

  async delete(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    return await this.userRepository.remove(user);
  }

  async performCRUDActionOnUser(
    userId: User,
    action: string,
    date: Date,
  ): Promise<void> {
    // Enregistrer l'action dans l'historique
    const userHistory = new Notification();
    userHistory.user = userId;
    userHistory.action = action;
    userHistory.createdAt = date;
    await this.userHistoryRepository.save(userHistory);
  }
}
