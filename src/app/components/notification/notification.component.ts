import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="notificationService.isVisible" class="fixed bottom-5 right-5 p-4 rounded-md shadow-md text-white"
         [ngClass]="{
           'bg-green-600': notificationService.type === 'success',
           'bg-red-600': notificationService.type === 'error',
           'bg-yellow-600': notificationService.type === 'warning'
         }">
      {{ notificationService.message }}
    </div>
  `,
  styles: [`
    div {
      animation: fadeIn 0.3s ease-in-out, fadeOut 0.3s ease-out 3s forwards;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeOut {
      from { opacity: 1; transform: translateY(0); }
      to { opacity: 0; transform: translateY(10px); }
    }
  `]
})
export class NotificationComponent {
  constructor(public notificationService: NotificationService) {}
}
