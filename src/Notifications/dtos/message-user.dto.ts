import { User } from 'src/users/Entitys/users.entity';
import { NotificationAction } from '../NotifAction.enum';
export class CreateNotifDto {
  user: User;
  action: NotificationAction;
}
