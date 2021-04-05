import { UserStatus } from './user-status.enum';

export class User {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    isPhoneVerified: boolean;
    email: string;
    status: UserStatus;
    avatar?: string;
    roles?: string[];
}
