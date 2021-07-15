import { Injectable } from '@angular/core';
import { ChatComponent } from '../components/chat/chat.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { User } from '../../../modules/user/models/user.entity';
import { Product } from '../../../modules/product/models/product.entity';

@Injectable()
export class ChatModalService {
    constructor(private modalService: NzModalService) {}

    open(product?: Product, user?: User): void {
        this.modalService.create({
            nzContent: ChatComponent,
            nzFooter: null,
            nzWidth: '80%',
            nzComponentParams: {
                user,
                // @ts-ignore
                product,
            },
            nzBodyStyle: {
                padding: '0',
            },
            nzClassName: 'chat-body',
        });
    }
}
