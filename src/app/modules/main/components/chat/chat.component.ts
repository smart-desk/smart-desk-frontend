import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ChatService } from '../../../../shared/services/chat/chat.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent implements OnInit {
    constructor(private chatService: ChatService) {}

    ngOnInit(): void {
        this.chatService.newMessages$.subscribe(msg => console.log('new message', msg));
        this.chatService.joinChat$.subscribe(msg => console.log('join chat', msg));
    }

    sendMessage(chatId: string): void {
        this.chatService.sendMessage({ chatId, message: Math.random().toString() });
    }

    joinChat(chatId: string): void {
        this.chatService.joinChat({ chatId });
    }
}
