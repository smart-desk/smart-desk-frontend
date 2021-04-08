import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { ChatMessage } from '../../../../models/chat/chat-message.entity';

@Component({
    selector: 'app-chat-messages',
    templateUrl: './chat-messages.component.html',
    styleUrls: ['./chat-messages.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessagesComponent {
    @Input()
    messages: ChatMessage[];

    @Output()
    newMessage = new EventEmitter<string>();

    currentMessage: string;

    sendMessage(): void {
        if (!this.currentMessage) {
            return;
        }

        const message = new ChatMessage();
        message.content = this.currentMessage;
        this.messages.push(message);
        this.newMessage.emit(this.currentMessage);
        this.currentMessage = '';
    }
}
