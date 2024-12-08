import { Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'app-card',
    standalone: true,
    templateUrl: './card.component.html'
})
export class CardComponent {
  @HostBinding('class') @Input() class = '';
}
