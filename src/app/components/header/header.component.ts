import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="fixed w-full bg-black bg-opacity-90 z-50">
      <nav class="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" class="text-red-600 text-3xl font-bold">LGFLIX</a>
        <div class="flex items-center space-x-6">
          <a class="text-white hover:text-gray-300" href="/browse">Home</a>
          <a class="text-white hover:text-gray-300" href="/movies">Movies</a>
          <a class="text-white hover:text-gray-300" href="/tv-shows">TV Shows</a>
          <a class="text-white hover:text-gray-300" href="/my-list">My List</a>]
          <a class="text-white hover:text-gray-300" href="/login">Login</a>
        </div>
      </nav>
    </header>
  `
})
export class HeaderComponent {}