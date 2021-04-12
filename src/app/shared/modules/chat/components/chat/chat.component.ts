import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import { ChatService } from '../../services/chat.service';
import { Chat } from '../../../../models/chat/chat.entity';
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
    messages: ChatMessage[] = [];
    activeChat: Chat;

    @Input()
    advertId: string;

    private destroy$ = new Subject();

    constructor(private chatService: ChatService, private cdr: ChangeDetectorRef) {
        this.chatService.joinChat$.pipe(takeUntil(this.destroy$)).subscribe(res => {
            console.log('Connected to chat', res);
        });

        this.chatService.leaveChat$.pipe(takeUntil(this.destroy$)).subscribe(res => {
            console.log('Left chat', res);
        });

        this.chatService.newMessage$.pipe(takeUntil(this.destroy$)).subscribe(message => {
            this.messages = [...this.messages, message];
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
            .pipe(
                tap(chats => chats.forEach(chat => this.chatService.joinChat({ chatId: chat.id }))),
                switchMap(chats => {
                    if (!this.advertId) {
                        this.activeChat = chats[0];
                        return of(chats);
                    }

                    this.activeChat = chats.find(c => c.advertId === this.advertId);
                    if (this.activeChat) {
                        return of(chats);
                    }

                    return this.createEmptyChat(this.advertId).pipe(
                        map(emptyChat => {
                            this.activeChat = emptyChat;
                            chats.unshift(emptyChat);
                            return chats;
                        })
                    );
                })
            )
            .subscribe(chats => {
                this.chats = chats;
                if (this.activeChat && this.activeChat.id) {
                    this.chatService.getMessages({ chatId: this.activeChat.id });
                }
                this.cdr.detectChanges();
            });
    }

    changeActiveChat(chat: Chat): void {
        if (chat === this.activeChat) {
            return;
        }
        this.activeChat = chat;
        this.messages = [];
        this.chatService.getMessages({ chatId: this.activeChat.id });
        this.cdr.detectChanges();
    }

    sendMessage(content: string): void {
        const message = new CreateChatMessageDto();
        message.content = content;

        if (!this.activeChat.id) {
            this.chatService.createChat({ advertId: this.advertId }).subscribe(chat => {
                this.activeChat = chat;
                message.chatId = chat.id;
                this.chatService.sendMessage(message);
            });
            return;
        }

        message.chatId = this.activeChat.id;
        this.chatService.sendMessage(message);
    }

    private createEmptyChat(advertId: string): Observable<Chat> {
        const chat = new Chat();
        chat.advertId = advertId;
        return of(chat);
    }
}
