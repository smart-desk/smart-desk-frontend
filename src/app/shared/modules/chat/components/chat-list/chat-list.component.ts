import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { Chat } from '../../../../models/chat/chat.entity';

@Component({
    selector: 'app-chat-list',
    templateUrl: './chat-list.component.html',
    styleUrls: ['./chat-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatListComponent {
    @Input()
    chats: Chat[];

    @Input()
    activeChat: Chat;

    @Output()
    changeChat = new EventEmitter<Chat>();
}
