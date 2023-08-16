import { User } from 'src/users/Entitys/users.entity';

export class CreateUserDto {
  user: User;
  action: string;
  createdAt: Date;
}
