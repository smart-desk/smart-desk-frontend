import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../../../../services/user/models/user.entity';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationTypes } from './enums/notification.enum';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
    @Input() profile: User;
    form: FormGroup;
    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            chat: [this.profile.emailNotifications?.find(el => el === NotificationTypes.CHAT_MESSAGE)],
            general: [
                this.profile.emailNotifications?.find(
                    el =>
                        el === NotificationTypes.ADVERT_BLOCKED ||
                        el === NotificationTypes.ADVERT_PUBLISHED ||
                        el === NotificationTypes.USER_BLOCKED ||
                        el === NotificationTypes.USER_UNBLOCKED ||
                        false
                ),
            ],
        });
    }

    getNotificationOption(): NotificationTypes[] {
        const notificationOptions = [];
        if (this.form.get('chat')?.value) {
            notificationOptions.push(NotificationTypes.CHAT_MESSAGE);
        }
        if (this.form.get('general')?.value) {
            notificationOptions.push(NotificationTypes.ADVERT_PUBLISHED);
            notificationOptions.push(NotificationTypes.ADVERT_BLOCKED);
            notificationOptions.push(NotificationTypes.USER_BLOCKED);
            notificationOptions.push(NotificationTypes.USER_UNBLOCKED);
        }
        return notificationOptions;
    }
}
