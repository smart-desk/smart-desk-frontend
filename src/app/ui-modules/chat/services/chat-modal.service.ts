import { Injectable } from '@angular/core';
import { ChatComponent } from '../components/chat/chat.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { User } from '../../../modules/user/models/user.entity';
import { Advert } from '../../../modules/advert/models/advert.entity';

@Injectable()
export class ChatModalService {
    constructor(private modalService: NzModalService) {}

    open(advert?: Advert, user?: User): void {
        this.modalService.create({
            nzContent: ChatComponent,
            nzFooter: null,
            nzWidth: '80%',
            nzComponentParams: {
                user,
                advert,
            },
            nzBodyStyle: {
                padding: '0',
            },
            nzClassName: 'chat-body',
        });
    }
}
