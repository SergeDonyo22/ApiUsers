import { Injectable } from '@nestjs/common';
import { NotificationAction } from './NotifAction.enum';

@Injectable()
export class NotificationHistoryService {
  private history: string[] = [];

  addNotification(action: NotificationAction): void {
    this.history.push(action);
  }

  getHistory(): string[] {
    return this.history;
  }
}