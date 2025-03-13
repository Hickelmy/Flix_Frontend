import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { HttpClient } from '@angular/common/http';
import { WebSocketSubject } from 'rxjs/webSocket';

@Component({
  selector: 'app-etl',
  standalone: true,
  imports: [CommonModule], 
  template: `
    <div class="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <h1 class="text-3xl font-bold mb-6">ETL Dataset Downloader</h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button
          *ngFor="let dataset of datasets"
          class="flex items-center gap-4 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md transition"
          (click)="confirmDownload(dataset)"
        >
          <span>{{ dataset.name }}</span>
        </button>
      </div>

      <div *ngIf="progress" class="mt-6 w-full max-w-md">
        <p class="text-lg font-semibold">
          Progresso: {{ progress.stage }} - {{ progress.percent }}%
        </p>
        <div class="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
          <div
            class="bg-green-500 h-full transition-all duration-300"
            [style.width]="progress.percent + '%'"
          ></div>
        </div>
      </div>
    </div>
  `,
})
export class EtlComponent implements OnInit, OnDestroy {
  datasets = [
    { name: 'MovieLens 100k', url: 'https://files.grouplens.org/datasets/movielens/ml-100k.zip' },
    { name: 'MovieLens Latest', url: 'https://files.grouplens.org/datasets/movielens/ml-latest.zip' },
    { name: 'MovieLens 25M', url: 'https://files.grouplens.org/datasets/movielens/ml-25m.zip' }
  ];

  progress: { stage: string; percent: number } = { stage: 'Aguardando', percent: 0 }; 
  websocket?: WebSocketSubject<any>;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.connectToWebSocket();
  }

  ngOnDestroy() {
    this.websocket?.unsubscribe();
  }

  confirmDownload(dataset: { name: string; url: string }) {
    const isConfirmed = window.confirm(`Deseja iniciar o ETL para ${dataset.name}?`);
    if (isConfirmed) {
      this.startEtl(dataset.url);
    }
  }

  startEtl(datasetUrl: string) {
    this.http.post(`http://localhost:3005/start-etl/`, { dataset_url: datasetUrl }).subscribe({
      next: () => alert('ETL iniciado! Acompanhe o progresso abaixo.'),
      error: err => alert('Erro ao iniciar ETL: ' + err.message),
    });
  }

  connectToWebSocket() {
    this.websocket = new WebSocketSubject('ws://localhost:3005/progress');

    this.websocket.subscribe({
      next: data => (this.progress = data),
      error: () => console.error('Erro no WebSocket'),
      complete: () => console.warn('Conexão WebSocket encerrada'),
    });
  }
}
