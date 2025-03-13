import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, interval } from 'rxjs';

interface Movie {
  id: number;
  title: string;
  year: number;
  genres: string;
  image_base64: string;
}

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div class="min-h-screen bg-black text-white">
      <!-- Hero Section (Slider) -->
      <section class="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div class="relative w-full h-full transition-all duration-1000 ease-in-out transform">
          <img [src]="featuredMovie?.image_base64" class="absolute inset-0 w-full h-full object-cover opacity-50 transition-all duration-1000">
          <div class="absolute inset-0 bg-gradient-to-r from-black flex items-center px-8 md:px-16">
            <div class="max-w-2xl">
              <h1 class="text-5xl font-bold mb-4 animate-fade-in">{{ featuredMovie?.title }}</h1>
              <p class="text-lg mb-6 animate-fade-in">{{ featuredMovie?.genres }} ({{ featuredMovie?.year }})</p>
              <button class="bg-red-600 text-white px-8 py-3 rounded-md hover:bg-red-700 transition-all transform hover:scale-105" (click)="playMovie(featuredMovie)">
                ▶ Play Now
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Sections by Categories -->
      <section class="py-8 overflow-hidden"  *ngFor="let category of categories">
        <div class="container mx-auto px-4 relative">
          <h2 class="text-2xl font-bold mb-4">{{ category.title }}</h2>

          <!-- Slider Container -->
          <div class="relative">
            <button class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full z-10 hover:bg-opacity-80 transition" (click)="scrollLeft(category)">
              ◀
            </button>

            <div class="flex space-x-4 transition-transform duration-500 ease-in-out" [style.transform]="'translateX(' + category.offset + 'px)'">
              <div *ngFor="let movie of category.movies" 
                   class="relative group cursor-pointer w-60 flex-shrink-0 transform transition-transform duration-300 hover:scale-110" 
                   (click)="expandMovie(movie)">
                <img [src]="movie.image_base64" 
                     [alt]="movie.title" 
                     class="w-full h-auto rounded-md shadow-lg transition-transform duration-300">
                <div class="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 class="text-lg font-bold text-white">{{ movie.title }}</h3>
                  <p class="text-sm text-gray-300">{{ movie.year }}</p>
                </div>
              </div>
            </div>

            <button class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full z-10 hover:bg-opacity-80 transition" (click)="scrollRight(category)">
              ▶
            </button>
          </div>
        </div>
      </section>
    </div>
  `
})
export class MoviesComponent implements OnInit {
  featuredMovie: Movie | null = null;
  selectedMovie: Movie | null = null;
  playingMovie: Movie | null = null;
  private apiUrl = 'http://localhost:8000/movies?genres=';
  private currentHeroIndex = 0;

  categories = [
    { key: 'popular', title: 'Popular on Netflix', movies: [] as Movie[], offset: 0 },
    { key: 'recommended', title: 'Recommended', movies: [] as Movie[], offset: 0 },
    { key: 'comedy', title: 'Comedy Now', movies: [] as Movie[], offset: 0 },
    { key: 'action', title: 'Blockbuster Action & Adventure', movies: [] as Movie[], offset: 0 },
    { key: 'drama', title: 'Netflix Drama', movies: [] as Movie[], offset: 0 }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadMovies();
    this.startHeroSlider();
  }

  loadMovies() {
    this.categories.forEach(category => {
      this.getMoviesByCategory(category.key).subscribe(
        (data: Movie[]) => {
          category.movies = data;
          if (!this.featuredMovie && data.length) {
            this.featuredMovie = data[0];
          }
        },
        (error) => {
          console.error(`Erro ao buscar filmes da categoria ${category.key}:`, error);
        }
      );
    });
  }

  getMoviesByCategory(category: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}${category}`);
  }

  expandMovie(movie: Movie) {
    this.selectedMovie = movie;
  }

  closeMovie() {
    this.selectedMovie = null;
  }

  playMovie(movie: Movie | null) {
    if (movie) {
      this.playingMovie = movie;
    }
  }

  stopMovie() {
    this.playingMovie = null;
  }

  scrollLeft(category: any) {
    category.offset += 6 * -250; // Retrocede 6 cards (~250px cada)
    if (category.offset > 0) {
      category.offset = -((category.movies.length - 6) * 250); // Loop para início
    }
  }

  scrollRight(category: any) {
    category.offset -= 6 * -250; // Avança 6 cards (~250px cada)
    if (Math.abs(category.offset) > (category.movies.length - 6) * 250) {
      category.offset = 0; // Loop para início
    }
  }

  startHeroSlider() {
    interval(10000).subscribe(() => {
      const allMovies = this.categories.flatMap(category => category.movies);
      if (allMovies.length > 0) {
        this.currentHeroIndex = (this.currentHeroIndex + 1) % allMovies.length;
        this.featuredMovie = allMovies[this.currentHeroIndex];
      }
    });
  }
}
