import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ChatMessage } from '../../models/chat-message.entity';
import { Chat } from '../../models/chat.entity';
import { User } from '../../../../modules/user/models/user.entity';

@Component({
    selector: 'app-chat-messages',
    templateUrl: './chat-messages.component.html',
    styleUrls: ['./chat-messages.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessagesComponent {
    @Input()
    currentUser: User;

    @Input()
    chat: Chat;

    @Input()
    messages: ChatMessage[];

    @Output()
    newMessage = new EventEmitter<string>();

    currentMessage: string;

    getUserAvatar(userId: string): string {
        if (this.chat.user1 === userId) {
            return this.chat.user1Data?.avatar || '';
        }
        return this.chat.user2Data?.avatar || '';
    }

    getUserName(userId: string): string {
        if (this.chat.user1 === userId) {
            return this.chat.user1Data?.firstName;
        }
        return this.chat.user2Data?.firstName;
    }

    // todo add scroll to bottom
    sendMessage(): void {
        if (!this.currentMessage) {
            return;
        }

        const message = new ChatMessage();
        message.content = this.currentMessage;
        message.userId = this.currentUser.id;
        message.createdAt = new Date();
        this.messages.push(message);
        this.newMessage.emit(this.currentMessage);
        this.currentMessage = '';
    }
}
