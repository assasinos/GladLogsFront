import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../services/config.service';
import { Week } from '../../../types/Week';
import { Message } from '../../../types/Message';
import { CardComponent } from "../../card/card.component";
import { CardHeaderComponent } from "../../card/card-header/card-header.component";
import { CardTitleComponent } from "../../card/card-title/card-title.component";
import { CardContentComponent } from "../../card/card-content/card-content.component";
import { MessagesComponent } from "../../messages/messages.component";

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [ MessagesComponent],
  templateUrl: './logs.component.html',
})
export class LogsComponent implements OnInit {

  username: string= "";
  chatName: string= "";

  weeks: Week[] |null = null;

  constructor(private route: ActivatedRoute, private httpClient:HttpClient, private config: ConfigService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {

      if (!params['user'] || !params['chat']) {
        //Redirect to home
        window.location.href = "/";
      }

      //Get the user and chat id
      this.username= params['user'];
      this.chatName = params['chat'];

      //Get user active weeks
      this.getUserWeeks(this.username, this.chatName);

    });
  }  

  getUserWeeks(user: string, chat: string) {
    if (!user || !chat) {
      console.error('Invalid user or chat');
      return;
    }
    console.debug('Getting user active weeks for user: ' + user + ' and chat: ' + chat);
    //Get the user active weeks
    this.httpClient.get<Week[]>(this.config.getWeeksEndpoint(user, chat)).subscribe({
      next: (data :Week[]) => {
        this.weeks = data;
        //Parse the dates 
        this.weeks.forEach((week) => {
          week.startDate = new Date(week.startDate);
          week.endDate = new Date(week.endDate);
        });
      },
      error: (error) => {
        console.error('Error getting user active weeks');
      }
    }

    );
  }
  

}
