import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { CreateChatMessageDto } from '../../../models/chat/create-chat-message.dto';
import { ChatId } from '../../../models/chat/chat-id';
import { HttpClient } from '@angular/common/http';
import { CreateChatDto } from '../../../models/chat/create-chat.dto';
import { Chat } from '../../../models/chat/chat.entity';
import { ChatMessage } from '../../../models/chat/chat-message.entity';

enum ChatEvent {
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

    createChat(body: CreateChatDto): Observable<Chat> {
        return this.http.post<Chat>('/chats', body);
    }

    getProfileChats(): Observable<Chat[]> {
        return this.http.get<Chat[]>('/chats');
    }
}
