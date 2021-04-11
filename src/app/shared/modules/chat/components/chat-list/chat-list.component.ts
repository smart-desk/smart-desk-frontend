import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Chat } from '../../../../models/chat/chat.entity';

@Component({
    selector: 'app-chat-list',
    templateUrl: './chat-list.component.html',
    styleUrls: ['./chat-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatListComponent implements OnInit {
    @Input()
    chats: Chat[];

    constructor() {}

    ngOnInit(): void {}
}
