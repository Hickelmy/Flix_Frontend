import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterOutlet, Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { HeaderComponent } from './app/components/header/header.component';
import { HomeComponent } from './app/pages/home/home.component';
import { LoginComponent } from './app/pages/login/login.component';
import { EtlComponent } from './app/pages/etl/etl.component';
import { MoviesComponent } from './app/pages/movies/movies.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet],
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `
})
export class App {
  private router = inject(Router);

  constructor() {
    this.checkSession();
  }

  private checkSession() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']); // Redireciona apenas se não estiver autenticado
    }
  }
}

// 📌 Configuração das rotas
const routes = [
  { path: '', component: HomeComponent },
  { path: 'browse', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'etl', component: EtlComponent }
];

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
});
