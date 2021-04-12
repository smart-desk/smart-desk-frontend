import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { v4 } from 'uuid';
import { CreateChatMessageDto } from '../../../models/chat/create-chat-message.dto';
import { ChatId } from '../../../models/chat/chat-id';
import { HttpClient } from '@angular/common/http';
import { CreateChatDto } from '../../../models/chat/create-chat.dto';
import { Chat } from '../../../models/chat/chat.entity';
import { ChatMessage } from '../../../models/chat/chat-message.entity';
import { filter, map, take } from 'rxjs/operators';

enum ChatEvent {
    GET_CHATS = 'getChats',
    CREATE_CHAT = 'createChat',
    GET_MESSAGES = 'getMessages',
    NEW_MESSAGE = 'newMessage',
    JOIN_CHAT = 'joinChat',
    LEAVE_CHAT = 'leaveChat',
}

@Injectable({
    providedIn: 'root',
})
export class ChatService {
    constructor(private socket: Socket, private http: HttpClient) {}

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
