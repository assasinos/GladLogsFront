import { Routes } from '@angular/router';
import { HomeComponent } from './sites/home/home.component';
import { LogsComponent } from './sites/pages/logs.component';

export const routes: Routes = [
    {path: '', component: HomeComponent, pathMatch: 'full'},
    {path: 'logs', component: LogsComponent},
];
