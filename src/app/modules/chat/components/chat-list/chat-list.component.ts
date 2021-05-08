import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { Chat } from '../../models/chat.entity';
import { User } from '../../../../models/user/user.entity';

@Component({
    selector: 'app-chat-list',
    templateUrl: './chat-list.component.html',
    styleUrls: ['./chat-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatListComponent {
    @Input()
    currentUser: User;

    @Input()
    chats: Chat[];

    @Input()
    activeChat: Chat;

    @Output()
    changeChat = new EventEmitter<Chat>();

    changeActiveChat(chat: Chat): void {
        if (chat !== this.activeChat) {
            this.changeChat.emit(chat);
        }
    }

    // todo add pipe to avoid performance issues
    getConversationalist(chat: Chat): User | undefined {
        if (!this.currentUser) {
            return;
        }

        if (chat.user1 === this.currentUser.id) {
            return chat.user2Data;
        }
        return chat.user1Data;
    }
}
