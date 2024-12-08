import { Component } from '@angular/core';
import { CardComponent } from "../../card/card.component";
import { CardHeaderComponent } from "../../card/card-header/card-header.component";
import { CardTitleComponent } from "../../card/card-title/card-title.component";
import { CardContentComponent } from "../../card/card-content/card-content.component";

@Component({
    selector: 'app-home',
    imports: [CardComponent, CardHeaderComponent, CardTitleComponent, CardContentComponent],
    templateUrl: './home.component.html'
})
export class HomeComponent {

}
