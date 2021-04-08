import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Chat } from '../../../../models/chat/chat.entity';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ChatMessage } from '../../../../models/chat/chat-message.entity';
import { CreateChatMessageDto } from '../../../../models/chat/create-chat-message.dto';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent implements OnInit, OnDestroy {
    chats: Chat[];
    messages: ChatMessage[];
    activeChat: Chat;

    @Input()
    advertId: string;

    private destroy$ = new Subject();

    constructor(private chatService: ChatService, private cdr: ChangeDetectorRef) {
        this.chatService.joinChat$
            .pipe(
                takeUntil(this.destroy$),
                tap(res => this.chatService.getMessages({ chatId: res.chatId }))
            )
            .subscribe(res => {
                console.log('Connected to chat', res);
            });

        this.chatService.leaveChat$.pipe(takeUntil(this.destroy$)).subscribe(res => {
            console.log('Left chat', res);
        });

        this.chatService.newMessage$.pipe(takeUntil(this.destroy$)).subscribe(message => {
            this.messages.push(message);
            this.cdr.detectChanges();
        });

        this.chatService.getMessages$.pipe(takeUntil(this.destroy$)).subscribe(messages => {
            this.messages = messages;
            this.cdr.detectChanges();
        });
    }

    ngOnDestroy(): void {
        this.chats.forEach(chat => this.chatService.leaveChat({ chatId: chat.id }));
        this.destroy$.next();
        this.destroy$.complete();
    }

    ngOnInit(): void {
        this.chatService
            .getProfileChats()
            .pipe(tap(chats => chats.forEach(chat => this.chatService.joinChat({ chatId: chat.id }))))
            .subscribe(chats => {
                this.chats = chats;
                this.activeChat = this.chats.find(c => c.advertId === this.advertId) || this.chats[0];
                this.cdr.detectChanges();
            });
    }

    changeActiveChat(chat: Chat): void {
        this.activeChat = chat;
        this.messages = [];
        this.chatService.getMessages({ chatId: this.activeChat.id });
        this.cdr.detectChanges();
    }

    sendMessage(content: string): void {
        const message = new CreateChatMessageDto();
        message.content = content;
        message.chatId = this.chats[0].id;

        this.chatService.sendMessage(message);
    }
}
