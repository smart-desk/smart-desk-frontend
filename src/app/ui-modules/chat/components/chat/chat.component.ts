import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ChatService } from '../../services/chat.service';
import { Chat } from '../../models/chat.entity';
import { ChatMessage } from '../../models/chat-message.entity';
import { CreateChatMessageDto } from '../../models/create-chat-message.dto';
import { User } from '../../../../modules/user/models/user.entity';
import { Product } from '../../../../modules/product/models/product.entity';
import { UserService } from '../../../../modules/user/user.service';
import { LoginService } from '../../../../modules/login/login.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent implements OnDestroy, OnInit {
    loading: boolean;
    chats: Chat[];
    messages: ChatMessage[] = [];
    activeChat: Chat;
    currentUser: User;

    @Input()
    product: Product;

    @Input()
    user: User;

    private destroy$ = new Subject();

    constructor(
        private chatService: ChatService,
        private cdr: ChangeDetectorRef,
        private userService: UserService,
        private loginService: LoginService
    ) {
        this.loginService.login$.pipe(takeUntil(this.destroy$)).subscribe(user => {
            if (user) {
                this.currentUser = user;
            }
        });
    }

    ngOnInit(): void {
        this.chatService.updateHeaders();
        this.chatService.disconnect();
        this.chatService.connect();

        this.chatService.connection$.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.getInitialChats();
        });

        this.chatService.newChat$.pipe(takeUntil(this.destroy$)).subscribe(chat => {
            chat.unreadMessagesCount = 0;
            this.chatService.joinChat({ chatId: chat.id });
            this.chats = [chat, ...this.chats];
            this.cdr.detectChanges();
        });

        this.chatService.newMessage$.pipe(takeUntil(this.destroy$)).subscribe(message => {
            if (message.chatId === this.activeChat.id) {
                this.messages = [...this.messages, message];
            } else {
                const targetChat = this.chats.find(chat => chat.id === message.chatId);
                if (targetChat) {
                    targetChat.unreadMessagesCount += 1;
                    this.chats = [...this.chats];
                }
            }
            this.cdr.detectChanges();
        });

        this.chatService.getMessages$.pipe(takeUntil(this.destroy$)).subscribe(messages => {
            this.messages = messages;
            this.cdr.detectChanges();
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
        this.chatService.disconnect();
    }

    setActiveChat(chat: Chat): void {
        this.activeChat = chat;
        this.activeChat.unreadMessagesCount = 0;
        this.messages = [];
        if (this.activeChat.id) {
            this.chatService.getMessages({ chatId: this.activeChat.id });
            this.chatService.readChat({ chatId: this.activeChat.id });
        }
        this.cdr.detectChanges();
    }

    sendMessage(content: string): void {
        const message = new CreateChatMessageDto();
        message.content = content;

        if (!this.activeChat.id) {
            this.chatService.createChat({ productId: this.product.id }).subscribe(chat => {
                const indexOfActiveChat = this.chats.indexOf(this.activeChat);
                this.chats[indexOfActiveChat] = chat;
                this.activeChat = chat;
                message.chatId = chat.id;
                this.chats = [...this.chats];
                this.chatService.sendMessage(message);
                this.cdr.detectChanges();
            });
            return;
        }

        message.chatId = this.activeChat.id;
        this.chatService.sendMessage(message);
    }

    private getInitialChats(): void {
        this.loading = true;
        this.cdr.markForCheck();
        this.chatService
            .getProfileChats()
            .pipe(take(1))
            .subscribe(chats => {
                let activeChat: Chat | undefined;

                if (this.product) {
                    activeChat = chats.find(c => c.productId === this.product.id);
                    if (!activeChat) {
                        const emptyChat = this.createEmptyChat();
                        activeChat = emptyChat;
                        chats.unshift(emptyChat);
                    }
                } else {
                    activeChat = chats[0];
                }

                this.chats = chats;
                if (activeChat) {
                    this.setActiveChat(activeChat);
                }
                this.loading = false;
                this.cdr.detectChanges();
            });
    }

    private createEmptyChat(): Chat {
        const chat = new Chat();
        chat.productId = this.product.id;
        chat.productData = this.product;
        chat.user1 = this.currentUser?.id;
        chat.user1Data = this.currentUser;
        chat.user2 = this.user.id;
        chat.user2Data = this.user;
        return chat;
    }
}
