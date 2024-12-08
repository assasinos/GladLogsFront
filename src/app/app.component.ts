import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, HeaderComponent],
    templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'GladLogsFront';
}
