import { Notification } from 'src/Notifications/EntitysNotif/notification.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  FirstName: string;

  @Column()
  LastName: string;

  @Column()
  Age: number;

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];
}
