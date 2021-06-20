import { NotificationTypes } from '../../../modules/main/modules/profile/components/notifications/enums/notification.enum';

export class UpdateUserDto {
    firstName?: string;
    lastName?: string;
    avatar?: string;
    phone?: string;
    emailNotifications?: NotificationTypes[];
}
