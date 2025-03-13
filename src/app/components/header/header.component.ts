import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="fixed w-full bg-black bg-opacity-90 z-50">
      <nav class="container mx-auto px-4 py-4 flex items-center justify-between">
        <a [routerLink]="['/browse']" class="text-red-600 text-3xl font-bold">LGFLIX</a>
        
        <div class="flex items-center space-x-6">
          <a class="text-white hover:text-gray-300" [routerLink]="['/browse']">Home</a>
          <a class="text-white hover:text-gray-300" [routerLink]="['/movies']">Movies</a>
          <a class="text-white hover:text-gray-300" [routerLink]="['/tv-shows']">TV Shows</a>
          <a class="text-white hover:text-gray-300" [routerLink]="['/my-list']">My List</a>

          <!-- Se estiver logado, mostra o botão de logout -->
          <button *ngIf="isLoggedIn()" (click)="logout()" class="bg-gray-700 text-white p-2 rounded-md">
            Logout
          </button>

          <!-- Se NÃO estiver logado, mostra o link de login -->
          <a *ngIf="!isLoggedIn()" class="text-white hover:text-gray-300" [routerLink]="['/login']">Login</a>
        </div>
      </nav>
    </header>
  `
})
export class HeaderComponent {

  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');  // Verifica se há um token salvo
  }

  logout() {
    localStorage.removeItem('token');  // Remove o token
    this.router.navigate(['/login']);  // Redireciona para login
  }
}
