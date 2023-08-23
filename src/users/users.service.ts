import { Inject, Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { User } from './Entitys/users.entity';
import { Connection, DataSource, Repository, Transaction } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { NotifService } from 'src/Notifications/Notif.service';
import { NotificationAction } from 'src/Notifications/NotifAction.enum';
import { CreateNotifDto } from 'src/Notifications/dtos/message-user.dto';

@Injectable()
export class UsersService {
  getUserHistory: any;
  saveNotif: any;
  constructor(
    private readonly notifService: NotifService,
    private readonly dataSource: DataSource,
    @InjectConnection()
    private readonly connection: Connection
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const queryRunner = this.connection.createQueryRunner()
    await queryRunner.connect();
    await queryRunner.startTransaction()

    try {
      const user = new User
      user.FirstName = createUserDto.FirstName,
      user.LastName = createUserDto.LastName,
      user.Age = createUserDto.Age

      await queryRunner.manager.save(user)

      //Notification automatique
      const userName = `${user.LastName} created`
      const notification = new CreateNotifDto()
      notification.action = NotificationAction.CREATE

      await this.notifService.getUserNotification(queryRunner,notification,user)

      await queryRunner.commitTransaction()
      return { message: `${user.FirstName} created`}
    }catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async updateUser(id: number, updateUserDto: CreateUserDto){

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try{
      const user = await queryRunner.manager.findOneOrFail(User, {where: {id}})
      user.FirstName = updateUserDto.FirstName
      user.LastName = updateUserDto.LastName
      user.Age = updateUserDto.Age

      // enrégistrement de notification
      const message = `${user.FirstName}`
      const notification = new CreateNotifDto
      notification.action = NotificationAction.UPDATE

      await this.notifService.getUserNotification(queryRunner, notification, user)

      await queryRunner.commitTransaction()
      return {message: `${user.id} : ${user.FirstName} updated`}
    }catch(error) {
      await queryRunner.rollbackTransaction()
      throw error
    }finally {
      await queryRunner.release()
    }
  }

  async deleteUser(id: number) {
    const queryRunner = this.connection.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      const userdeleted = await queryRunner.manager.findOneOrFail(User, {where: {id}})

      await queryRunner.manager.delete(User, id)

      // enrégistrement
      const message = `deleted ${userdeleted.FirstName}`
      const notification = new CreateNotifDto
      notification.action = NotificationAction.DELETE

      await this.notifService.getUserNotification(queryRunner, notification, userdeleted)
      await queryRunner.commitTransaction()
      return {
        message: `${userdeleted.id} : ${userdeleted.FirstName} deleted`
      }
    }catch(error) {
      await queryRunner.rollbackTransaction()
      throw error
    }finally {
      await queryRunner.release()
    }
  }
    async findMany() {
      const user = new User()
      const ManyUser = await this.connection.manager.find(User)
      return {message: 'users : ', user: ManyUser}
    }

    async findManys(id: number) {
      const userId = await this.connection.manager.findOne(User, {where: {id}})
      return {message: `user : ${userId.id} `, user: userId}
    }

  }

