import { NotificationTypes } from './notification-types.enum';

export class UpdateUserDto {
    firstName?: string;
    lastName?: string;
    avatar?: string;
    phone?: string;
    emailNotifications?: NotificationTypes[];
}
