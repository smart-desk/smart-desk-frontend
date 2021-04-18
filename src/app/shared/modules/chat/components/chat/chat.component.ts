import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import { ChatService } from '../../services/chat.service';
import { Chat } from '../../models/chat.entity';
import { ChatMessage } from '../../models/chat-message.entity';
import { CreateChatMessageDto } from '../../models/create-chat-message.dto';
import { User } from '../../../../models/user/user.entity';
import { Advert } from '../../../../models/advert/advert.entity';
import { UserService } from '../../../../services';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent implements OnDestroy, OnInit {
    chats: Chat[];
    messages: ChatMessage[] = [];
    activeChat: Chat;
    currentUser: User;

    @Input()
    advert: Advert;

    @Input()
    user: User;

    private destroy$ = new Subject();

    constructor(private chatService: ChatService, private cdr: ChangeDetectorRef, private userService: UserService) {
        this.chatService.connection$.pipe(takeUntil(this.destroy$)).subscribe(res => {
            this.chatService.initChats();
            this.getInitialChats();
        });

        this.chatService.newChat$.pipe(takeUntil(this.destroy$)).subscribe(chat => {
            this.chats = [chat, ...this.chats];
            this.cdr.detectChanges();
        });

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

    ngOnInit() {
        this.userService
            .getCurrentUser()
            .pipe(take(1))
            .subscribe(user => {
                this.currentUser = user;
                this.cdr.detectChanges();
            });
    }

    ngOnDestroy(): void {
        // todo this.chats.forEach(chat => this.chatService.leaveChat({ chatId: chat.id }));
        this.destroy$.next();
        this.destroy$.complete();
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
            this.chatService.createChat({ advertId: this.advert.id }).subscribe(chat => {
                this.activeChat = chat;
                message.chatId = chat.id;
                this.chatService.sendMessage(message);
            });
            return;
        }

        message.chatId = this.activeChat.id;
        this.chatService.sendMessage(message);
    }

    private getInitialChats(): void {
        this.chatService
            .getProfileChats()
            .pipe(
                tap(chats => chats.forEach(chat => this.chatService.joinChat({ chatId: chat.id }))),
                switchMap(chats => {
                    if (!this.advert) {
                        this.activeChat = chats[0];
                        return of(chats);
                    }

                    this.activeChat = chats.find(c => c.advertId === this.advert.id);
                    if (this.activeChat) {
                        return of(chats);
                    }

                    return this.createEmptyChat().pipe(
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

    private createEmptyChat(): Observable<Chat> {
        const chat = new Chat();
        chat.advertId = this.advert.id;
        chat.advertData = this.advert;
        chat.user2Data = this.user;
        return of(chat);
    }
}
