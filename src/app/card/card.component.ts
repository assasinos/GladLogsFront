import { Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'app-card',
    imports: [],
    templateUrl: './card.component.html'
})
export class CardComponent {
  @HostBinding('class') @Input() class = '';
}
