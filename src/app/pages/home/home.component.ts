import { Component, OnInit, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';

const API_KEY = "24e9e767b7d82e9d74acb843dea1960d";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/original"; // ✅ Imagem de alta qualidade
const SEARCH_URL = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=`;

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient) {}

  getTrendingMovies(): Observable<any> {
    return this.http.get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
  }

  getMoviesByGenre(genreId: number): Observable<any> {
    return this.http.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);
  }

  searchMovies(query: string): Observable<any> {
    return this.http.get(`${SEARCH_URL}${query}`);
  }
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MovieCardComponent],
  providers: [MovieService],
  template: `
    <div class="min-h-screen bg-black text-white">
      <!-- Hero Section -->
      <section *ngIf="featuredMovie" class="relative h-[70vh] w-full flex items-center justify-center overflow-hidden transition-opacity duration-1000 ease-in-out">
        <div class="absolute inset-0 w-full h-full">
          <img [src]="getMovieImage(featuredMovie, true)" 
               class="absolute inset-0 w-full h-full object-cover opacity-50 transition-all duration-1000">
        </div>
        <div class="absolute inset-0 bg-gradient-to-r from-black flex items-center px-8 md:px-16">
          <div class="max-w-2xl animate-fade-in">
            <h1 class="text-5xl font-bold mb-4">{{ featuredMovie?.title }}</h1>
            <p class="text-lg mb-6">Release Date: {{ featuredMovie?.release_date }}</p>
            <button class="bg-red-600 text-white px-8 py-3 rounded-md hover:bg-red-700 transition-all transform hover:scale-105"
                    (click)="playMovie(featuredMovie)">
              ▶ Play Now
            </button>
          </div>
        </div>
      </section>

      <!-- Movies Section -->
      <section class="py-8">
        <div class="container mx-auto px-4">
          <h2 class="text-2xl font-bold mb-6">Trending Movies</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <app-movie-card *ngFor="let movie of trendingMovies" [movie]="movie" [imageUrl]="getMovieImage(movie)"></app-movie-card>
          </div>
        </div>
      </section>

      <!-- Genre Sections -->
      <section *ngFor="let category of categories" class="py-8">
        <div class="container mx-auto px-4">
          <h2 class="text-2xl font-bold mb-6">{{ category.title }}</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <app-movie-card *ngFor="let movie of category.movies" [movie]="movie" [imageUrl]="getMovieImage(movie)"></app-movie-card>
          </div>
        </div>
      </section>
    </div>
  `
})
export class HomeComponent implements OnInit {
  trendingMovies: any[] = [];
  featuredMovie: any | null = null;
  imgUrl = IMG_URL;
  categories = [
    { id: 28, title: 'Action', movies: [] },
    { id: 35, title: 'Comedy', movies: [] },
    { id: 18, title: 'Drama', movies: [] },
    { id: 27, title: 'Horror', movies: [] },
    { id: 10749, title: 'Romance', movies: [] }
  ];

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.loadTrendingMovies();
    this.loadGenres();
  }

  loadTrendingMovies() {
    this.movieService.getTrendingMovies().subscribe(
      (response: any) => {
        this.trendingMovies = response.results;
        if (this.trendingMovies.length > 0) {
          this.featuredMovie = this.trendingMovies[Math.floor(Math.random() * this.trendingMovies.length)];
        }
      },
      (error) => {
        console.error('Error fetching trending movies:', error);
      }
    );
  }

  loadGenres() {
    this.categories.forEach(category => {
      this.movieService.getMoviesByGenre(category.id).subscribe(
        (response: any) => {
          category.movies = response.results;
        },
        (error) => {
          console.error(`Error fetching ${category.title} movies:`, error);
        }
      );
    });
  }

  /** Método para pegar a imagem correta do filme */
  getMovieImage(movie: any, isBackdrop: boolean = false): string {
    if (isBackdrop && movie.backdrop_path) {
      return `${IMG_URL}${movie.backdrop_path}`;
    } else if (movie.poster_path) {
      return `${IMG_URL}${movie.poster_path}`;
    } else {
      return 'https://via.placeholder.com/500x750?text=No+Image'; // Imagem de fallback
    }
  }

  playMovie(movie: any) {
    alert(`Playing ${movie.title}`);
  }
}
