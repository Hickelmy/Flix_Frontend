import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  message: string = '';
  type: 'success' | 'error' | 'warning' = 'success';
  isVisible: boolean = false;

  showNotification(message: string, type: 'success' | 'error' | 'warning' = 'success') {
    this.message = message;
    this.type = type;
    this.isVisible = true;

    // Ocultar a notificação após 3 segundos
    setTimeout(() => {
      this.isVisible = false;
    }, 3000);
  }
}
