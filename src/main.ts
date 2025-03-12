import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterOutlet } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { HeaderComponent } from './app/components/header/header.component';
import { HomeComponent } from './app/pages/home/home.component';
import { LoginComponent } from './app/pages/login/login.component';
import { EtlComponent } from './app/pages/etl/etl.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet],
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `
})
export class App {}

const routes = [
  { path: '', component: HomeComponent },
  { path: 'browse', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'etl', component: EtlComponent }

];

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
});