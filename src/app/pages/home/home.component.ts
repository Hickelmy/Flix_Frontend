import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  template: `
    <div class="min-h-screen bg-black text-white">
      <!-- Hero Section -->
      <section class="relative h-[80vh]">
        <div class="absolute inset-0 bg-gradient-to-r from-black">
          <div class="container mx-auto px-4 h-full flex items-center">
            <div class="max-w-2xl">
              <h1 class="text-5xl font-bold mb-4">Featured Title</h1>
              <p class="text-lg mb-6">Watch the latest movies and TV shows on our platform.</p>
              <button class="bg-red-600 text-white px-8 py-3 rounded-md hover:bg-red-700">
                Play Now
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Trending Section -->
      <section class="py-8">
        <div class="container mx-auto px-4">
          <h2 class="text-2xl font-bold mb-6">Trending Now</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            @for (movie of trendingMovies; track movie.id) {
              <app-movie-card [movie]="movie"></app-movie-card>
            }
          </div>
        </div>
      </section>
    </div>
  `
})
export class HomeComponent implements OnInit {
  trendingMovies: any[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieService.getTrendingMovies().subscribe(
      (data) => {
        this.trendingMovies = data;
      },
      (error) => {
        console.error('Error fetching trending movies:', error);
      }
    );
  }
}