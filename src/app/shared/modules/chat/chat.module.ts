import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './components/chat/chat.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { ChatModalService } from './services/chat-modal.service';
import { NzListModule } from 'ng-zorro-antd/list';
import { ChatMessagesComponent } from './components/chat-messages/chat-messages.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { RouterModule } from '@angular/router';

@NgModule({
    providers: [ChatModalService],
    declarations: [ChatComponent, ChatListComponent, ChatMessagesComponent],
    imports: [
        CommonModule,
        NzButtonModule,
        NzGridModule,
        NzListModule,
        NzInputModule,
        NzIconModule,
        FormsModule,
        NzAvatarModule,
        NzResultModule,
        NzBadgeModule,
        RouterModule,
    ],
})
export class ChatModule {}
