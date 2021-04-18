import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable } from 'rxjs';
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
    READ_CHAT = 'readChat',
    GET_MESSAGES = 'getMessages',
    NEW_MESSAGE = 'newMessage',
    JOIN_CHAT = 'joinChat',
}

interface ChatGatewayResponse {
    id: string;
    data: any;
}

@Injectable({
    providedIn: 'root',
})
export class ChatService {
    private connection = new BehaviorSubject<boolean>(false);

    constructor(private socket: Socket) {
        this.socket
            .fromEvent('connect')
            .pipe(take(1))
            .subscribe(() => {
                this.connection.next(true);
                this.socket.emit(ChatEvent.INIT_CHATS, {});
            });
    }

    get connection$(): Observable<any> {
        return this.connection.asObservable();
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

    readChat(data: ChatId): void {
        this.socket.emit(ChatEvent.READ_CHAT, data);
    }

    get newChat$(): Observable<Chat> {
        return this.socket.fromEvent(ChatEvent.NEW_CHAT);
    }

    createChat(body: CreateChatDto): Observable<Chat> {
        const id = v4();
        this.socket.emit(ChatEvent.CREATE_CHAT, { id, ...body });
        return this.socket.fromEvent<ChatGatewayResponse>(ChatEvent.CREATE_CHAT).pipe(
            filter(res => res.id === id),
            map(res => res.data),
            take(1)
        );
    }

    getProfileChats(): Observable<Chat[]> {
        const id = v4();
        this.socket.emit(ChatEvent.GET_CHATS, { id });
        return this.socket.fromEvent<ChatGatewayResponse>(ChatEvent.GET_CHATS).pipe(
            filter(res => res.id === id),
            map(res => res.data),
            take(1)
        );
    }
}
