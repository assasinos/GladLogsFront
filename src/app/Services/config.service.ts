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
    return `${this.GetApiUrl()}Chats`;
  }


  
}
