import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  template: `
    <div class="group relative cursor-pointer transition-transform transform hover:scale-105">
      <img [src]="imageUrl" [alt]="movie.title" class="w-full h-auto rounded-md">
      <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div class="text-center">
          <h3 class="text-lg font-bold text-white">{{ movie.title }}</h3>
          <p class="text-sm text-gray-300">{{ movie.release_date }}</p>
        </div>
      </div>
    </div>
  `
})
export class MovieCardComponent {
  @Input() movie: any;
  @Input() imageUrl: string = ''; // ✅ Agora aceita a URL da imagem corretamente
}
