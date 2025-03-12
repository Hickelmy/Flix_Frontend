import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative group cursor-pointer transition-transform duration-200 hover:scale-105">
      <img [src]="movie.posterUrl" [alt]="movie.title" class="rounded-md w-full">
      <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 class="text-white text-lg font-semibold">{{movie.title}}</h3>
        <p class="text-gray-300 text-sm">{{movie.releaseYear}}</p>
      </div>
    </div>
  `
})
export class MovieCardComponent {
  @Input() movie: any;
}