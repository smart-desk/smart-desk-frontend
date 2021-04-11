import { Injectable } from '@angular/core';
import { ChatComponent } from '../components/chat/chat.component';
import { NzModalService } from 'ng-zorro-antd/modal';

@Injectable()
export class ChatModalService {
    constructor(private modalService: NzModalService) {}

    open(advertId?: string): void {
        this.modalService.create({
            nzContent: ChatComponent,
            nzFooter: null,
            nzWidth: '80%',
            nzComponentParams: {
                advertId,
            },
            nzBodyStyle: {
                padding: '0',
            },
        });
    }
}
