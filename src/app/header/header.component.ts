import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chat } from '../../types/Chat';
import { ConfigService } from '../Services/config.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  constructor(private http: HttpClient, private config: ConfigService) {}

  _chats:Chat[] | null = null;


    /**
   * Retrieves chat data from the server.
   * @returns An array of Chat objects or null if the data was not sent.
   */
  private GetChatsFromServer(): void {

    this.http.get<Chat[]>(this.config.GetChatsEndpoint()).subscribe({
      next: (data: Chat[]) => {
        console.debug(`${data.length} chats retrieved from server`);
        this._chats = data;
        localStorage.setItem('chats', JSON.stringify(data));
        localStorage.setItem('lastUpdate', Date.now().toString());
      },
      error: (error) => {
        console.error(error);
      },
    });

  }

    /**
   * Retrieves chat data either from local storage or from the server if the data is outdated or not present.
   */
  private getChats(): void {

    this._chats= this.getChatFromLocalStorage();

    if (this._chats === null) {
      this.GetChatsFromServer();
    }


  }

    /**
   * Retrieves chat data from local storage if it exists and is not outdated.
   * @returns An array of Chat objects or null if the data is not present or outdated.
   */
  private getChatFromLocalStorage(): Chat[] | null {

    const json = localStorage.getItem('chats');
    if (json !== null) {
      let lastUpdate = Date.parse(localStorage.getItem('lastUpdate') ?? '');

      //Check if last update was more than 24 hours ago
      if (Date.now() - lastUpdate > 86400000) {
        return null;
      }
      const chats = JSON.parse(json) as Chat[];
      return chats as Chat[];
    }

    return null;
  }

  ngOnInit() {
    this.getChats();
  }

  //TODO: Add Routing to log page on button click
}
