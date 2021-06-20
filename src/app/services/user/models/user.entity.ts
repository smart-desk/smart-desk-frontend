import { UserStatus } from './user-status.enum';
import { NotificationTypes } from './notification-types.enum';

export class User {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    isPhoneVerified: boolean;
    email: string;
    status: UserStatus;
    roles: string[];
    avatar?: string;
    emailNotifications: NotificationTypes[];
}
