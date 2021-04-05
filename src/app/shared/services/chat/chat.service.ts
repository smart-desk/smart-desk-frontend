import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

export interface ChatEvent {
    chatId: string;
}

export interface ChatMessage extends ChatEvent {
    message: string;
}

enum ChatEventType {
    MESSAGE = 'message',
    JOIN_CHAT = 'joinChat',
}

@Injectable({
    providedIn: 'root',
})
export class ChatService {
    constructor(private socket: Socket) {}

    sendMessage(message: ChatMessage) {
        this.socket.emit(ChatEventType.MESSAGE, message);
    }

    joinChat(data: ChatEvent): void {
        this.socket.emit(ChatEventType.JOIN_CHAT, data);
    }

    get newMessages$(): Observable<any> {
        return this.socket.fromEvent(ChatEventType.MESSAGE);
    }

    get joinChat$(): Observable<any> {
        return this.socket.fromEvent(ChatEventType.JOIN_CHAT);
    }
}
