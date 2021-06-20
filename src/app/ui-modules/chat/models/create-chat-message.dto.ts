import { ChatId } from './chat-id';

export class CreateChatMessageDto extends ChatId {
    content: string;
}
