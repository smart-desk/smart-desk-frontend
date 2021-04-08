import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './components/chat/chat.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { ChatModalService } from './services/chat-modal.service';

@NgModule({
    providers: [ChatModalService],
    declarations: [ChatComponent, ChatListComponent],
    imports: [CommonModule, NzButtonModule, NzGridModule],
})
export class ChatModule {}
