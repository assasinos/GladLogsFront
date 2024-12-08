import { Component, Input } from '@angular/core';
import { Message } from '../../types/Message';

@Component({
    selector: 'app-message',
    standalone: true,
    templateUrl: './message.component.html'
})
export class MessageComponent {

  @Input() message: Message | null = null;

}
