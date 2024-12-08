import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  private apiUrl = 'https://localhost:7105/';

  public GetApiUrl(): string {
    return this.apiUrl;
  }

  public GetChatsEndpoint(): string {
    return `${this.GetApiUrl()}chats`;
  }

  public GetMessagesEndpoint(username:string, chat:string, weekId:string): string {
    return `${this.GetApiUrl()}messages?UserId=${username}&WeekId=${weekId}&ChatId=${chat}`;
  }

  public getWeeksEndpoint(username :string, chat:string): string {
    return `${this.GetApiUrl()}weeks?UserName=${username}&ChatName=${chat}`;

  }


  
}
