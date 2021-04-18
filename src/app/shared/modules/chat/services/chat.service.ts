import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { v4 } from 'uuid';
import { CreateChatMessageDto } from '../models/create-chat-message.dto';
import { ChatId } from '../models/chat-id';
import { CreateChatDto } from '../models/create-chat.dto';
import { Chat } from '../models/chat.entity';
import { ChatMessage } from '../models/chat-message.entity';
import { filter, map, take } from 'rxjs/operators';

export enum ChatEvent {
    GET_CHATS = 'getChats',
    CREATE_CHAT = 'createChat',
    INIT_CHATS = 'initChats',
    NEW_CHAT = 'newChat',
    GET_MESSAGES = 'getMessages',
    NEW_MESSAGE = 'newMessage',
    JOIN_CHAT = 'joinChat',
    LEAVE_CHAT = 'leaveChat',
}

@Injectable({
    providedIn: 'root',
})
export class ChatService {
    constructor(private socket: Socket) {}

    get connection$(): Observable<any> {
        return this.socket.fromEvent('connect');
    }

    initChats(): void {
        this.socket.emit(ChatEvent.INIT_CHATS, {});
    }

    sendMessage(message: CreateChatMessageDto) {
        this.socket.emit(ChatEvent.NEW_MESSAGE, message);
    }
    get newMessage$(): Observable<ChatMessage> {
        return this.socket.fromEvent(ChatEvent.NEW_MESSAGE);
    }

    getMessages(chatId: ChatId) {
        this.socket.emit(ChatEvent.GET_MESSAGES, chatId);
    }
    get getMessages$(): Observable<ChatMessage[]> {
        return this.socket.fromEvent(ChatEvent.GET_MESSAGES);
    }

    joinChat(data: ChatId): void {
        this.socket.emit(ChatEvent.JOIN_CHAT, data);
    }
    get joinChat$(): Observable<ChatId> {
        return this.socket.fromEvent(ChatEvent.JOIN_CHAT);
    }
    get newChat$(): Observable<Chat> {
        return this.socket.fromEvent(ChatEvent.NEW_CHAT);
    }

    leaveChat(data: ChatId): void {
        this.socket.emit(ChatEvent.LEAVE_CHAT, data);
    }
    get leaveChat$(): Observable<ChatId> {
        return this.socket.fromEvent(ChatEvent.LEAVE_CHAT);
    }

    // todo any
    createChat(body: CreateChatDto): Observable<Chat> {
        const id = v4();
        this.socket.emit(ChatEvent.CREATE_CHAT, { id, ...body });
        return this.socket.fromEvent<any>(ChatEvent.CREATE_CHAT).pipe(
            filter(res => res.id === id),
            map(res => res.data),
            take(1)
        );
    }

    // todo any
    getProfileChats(): Observable<Chat[]> {
        const id = v4();
        this.socket.emit(ChatEvent.GET_CHATS, { id });
        return this.socket.fromEvent<any>(ChatEvent.GET_CHATS).pipe(
            filter(res => res.id === id),
            map(res => res.data),
            take(1)
        );
    }
}
