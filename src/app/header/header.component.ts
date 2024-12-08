import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chat } from '../../types/Chat';
import { ConfigService } from '../services/config.service';
import {FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  constructor(private http: HttpClient, private config: ConfigService, private router: Router) {}

  _chats:Chat[] | null = null;

  _nickname:string = "";
  _chat:string = "Choose a chat";


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

  searchButtonClicked() {
    console.log(`Search button clicked with Name: ${this._nickname} and Chat: ${this._chat}`);
    if (this._nickname === "" || this._chat === "Choose a chat") {
      console.log("Invalid input");
      return;
    }


    //Route to logs
    this.router.navigate(['/logs'], {queryParams: {user: this._nickname, chat: this._chat}}).then(() => {
      window.location.reload(); // Reload the page with new search results
    });

  }
}
