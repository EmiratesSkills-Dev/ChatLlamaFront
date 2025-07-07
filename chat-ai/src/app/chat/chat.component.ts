import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { ChatAiService } from '../chat-ai.service';
import { HttpClientModule } from '@angular/common/http';
import { NzTagModule } from 'ng-zorro-antd/tag';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NzInputModule,
    NzButtonModule,
    NzCardModule,
    NzSpinModule,
    NzTagModule
  ],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  messages: Message[] = [];
  question = '';
  loading = false;

  constructor(private chatAi: ChatAiService) {}

  send() {
    if (!this.question.trim()) return;
    const q = this.question;
    this.messages.push({ role: 'user', text: q });
    this.question = '';
    this.loading = true;

    this.chatAi.sendQuestion(q).subscribe({
      next: (res) => {
        this.messages.push({ role: 'ai', text: res.answer });
        this.loading = false;
      },
      error: () => {
        this.messages.push({ role: 'ai', text: 'Failed to get response' });
        this.loading = false;
      }
    });
  }

  formatMessage(text: string): string {
    return text.replace(/\n/g, '<br>');
  }
}
