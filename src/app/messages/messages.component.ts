import { Component, Input } from '@angular/core';
import { Message } from '../../types/Message';
import { CardComponent } from '../card/card.component';
import { CardHeaderComponent } from '../card/card-header/card-header.component';
import { CardTitleComponent } from '../card/card-title/card-title.component';
import { CardContentComponent } from '../card/card-content/card-content.component';
import { Week } from '../../types/Week';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../services/config.service';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardTitleComponent,
    CardContentComponent,
    MessageComponent,
  ],
  templateUrl: './messages.component.html',
})
export class MessagesComponent {
  @Input() Week: Week | null = null;
  @Input() Username: string | null = null;
  @Input() Chatname: string | null = null;
  Messages: Message[] | null = null;
  MessagesHidden: boolean = true;
  Loading: boolean = false;

  constructor(private httpClient: HttpClient, private config: ConfigService) {}

  getChatLogs(user: string, chat: string, weekId: string) {
    if (!user || !chat || !weekId) {
      console.error('Invalid user, chat or week id');
      return;
    }
    console.debug(
      'Getting chat logs for user: ' +
        user +
        ' and chat: ' +
        chat +
        ' and week: ' +
        weekId
    );
    this.Loading = true;
    //Get the chat logs
    return this.httpClient
      .get<Message[]>(this.config.GetMessagesEndpoint(user, chat, weekId))
      .subscribe({
        next: (data: Message[]) => {
          this.Messages = data;
          //Parse the dates
          this.Messages.forEach((message) => {
            message.timestamp = new Date();
          });

          this.Messages.sort((a,b)=>{return b.timestamp.getTime() - a.timestamp.getTime()});

          this.MessagesHidden = false;
          this.Loading = false;
        },
        error: (error) => {
          console.error('Error getting chat logs');
        },
      });
  }

  LoadMessages() {
    if (this.Week == null || this.Username == null || this.Chatname == null) {
      console.error('Invalid week, username or chatname');
      return;
    }
    console.debug('Loading messages for week: ' + this.Week.id);
    if (this.Messages === null) {

      this.getChatLogs(this.Username, this.Chatname, this.Week.id);

      return;
    }

    this.MessagesHidden = false;
  }

  HideMessages() {
    this.MessagesHidden = true;
    console.debug('Hiding messages', this.MessagesHidden);
  }
}
