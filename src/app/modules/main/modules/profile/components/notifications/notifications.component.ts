import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../../../../models/user/user.entity';
import { FormControl, FormGroup } from '@angular/forms';
import { Notification } from './enums/notification.enum';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
    @Input() profile: User;
    form: FormGroup;
    notif = Notification;
    constructor() {}

    ngOnInit(): void {
        this.form = new FormGroup({
            messages: new FormControl(this.profile.emailNotifications?.find(el => el === this.notif.MESSAGES)),
            website: new FormControl(
                this.profile.emailNotifications?.find(
                    el =>
                        el === this.notif.PUBLISHING_ADS ||
                        el === this.notif.PUBLISHING_ADS ||
                        el === this.notif.BLOCK_USER ||
                        el === this.notif.UNBLOCK_USER ||
                        false
                )
            ),
        });
    }

    getNotificationOption(): string[] {
        const notificationOptions = [];
        if (this.form.get('messages')?.value) {
            notificationOptions.push(this.notif.MESSAGES);
        }
        if (this.form.get('website')?.value) {
            notificationOptions.push(this.notif.PUBLISHING_ADS);
            notificationOptions.push(this.notif.BLOCK_ADS);
            notificationOptions.push(this.notif.BLOCK_USER);
            notificationOptions.push(this.notif.UNBLOCK_USER);
        }
        return notificationOptions;
    }
}
