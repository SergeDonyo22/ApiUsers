import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/Entitys/users.entity';
import { NotificationAction } from '../NotifAction.enum';

@Entity('Notifications')
export class NotificationEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.notifications)
  user: User;

  @Column()
  action: NotificationAction;

  @CreateDateColumn()
  createdAt: Date;

}
