import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { NotificationComponent } from "../../components/notification/notification.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, NotificationComponent],
  template: `
    <app-notification></app-notification>

    <div class="flex items-center justify-center min-h-screen bg-cover bg-center"
    style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f562aaf4-5dbb-4603-a32b-6ef6c2230136/dh0w8qv-9d8ee6b2-b41a-4681-ab9b-8a227560dc75.jpg/v1/fill/w_1280,h_720,q_75,strp/the_netflix_login_background__canada__2024___by_logofeveryt_dh0w8qv-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvZjU2MmFhZjQtNWRiYi00NjAzLWEzMmItNmVmNmMyMjMwMTM2XC9kaDB3OHF2LTlkOGVlNmIyLWI0MWEtNDY4MS1hYjliLThhMjI3NTYwZGM3NS5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.LOYKSxIDqfPwWHR0SSJ-ugGQ6bECF0yO6Cmc0F26CQs');">      
      <div class="w-full max-w-md bg-black bg-opacity-75 p-8 rounded-md">
        <div class="flex justify-around mb-6">
          <button (click)="toggleTab('login')" 
                  [class.text-white]="tab === 'login'" 
                  class="text-gray-400 text-lg font-bold">
            Login
          </button>
          <button (click)="toggleTab('register')" 
                  [class.text-white]="tab === 'register'" 
                  class="text-gray-400 text-lg font-bold">
            Register
          </button>
        </div>

        <!-- LOGIN -->
        <div *ngIf="tab === 'login'">
          <h1 class="text-white text-2xl font-bold mb-6">Sign In</h1>
          <form class="flex flex-col" (ngSubmit)="onLogin()">
            <input type="text" [(ngModel)]="loginData.username" name="username" placeholder="Username" 
                   class="p-3 mb-3 bg-gray-800 text-white rounded outline-none focus:ring-2 focus:ring-red-600" required>
            <input type="password" [(ngModel)]="loginData.password" name="password" placeholder="Password" 
                   class="p-3 mb-3 bg-gray-800 text-white rounded outline-none focus:ring-2 focus:ring-red-600" required>
            <button type="submit" class="bg-red-600 hover:bg-red-700 text-white p-3 rounded font-bold">
              Sign In
            </button>
          </form>
        </div>

        <!-- REGISTRO -->
        <div *ngIf="tab === 'register'">
          <h1 class="text-white text-2xl font-bold mb-6">Sign Up</h1>
          <form class="flex flex-col" (ngSubmit)="onRegister()">
            <input type="text" [(ngModel)]="registerData.username" name="regUsername" placeholder="Username" 
                   class="p-3 mb-3 bg-gray-800 text-white rounded outline-none focus:ring-2 focus:ring-red-600" required>
            <input type="password" [(ngModel)]="registerData.password" name="regPassword" placeholder="Password" 
                   class="p-3 mb-3 bg-gray-800 text-white rounded outline-none focus:ring-2 focus:ring-red-600" required>
            <button type="submit" class="bg-green-600 hover:bg-green-700 text-white p-3 rounded font-bold">
              Register
            </button>
          </form>
        </div>

        <div class="text-gray-400 text-sm mt-6 text-center">
          <p *ngIf="tab === 'login'">New to LGFLIX? 
            <a (click)="toggleTab('register')" class="text-white hover:underline cursor-pointer">Sign up now.</a>
          </p>
          <p *ngIf="tab === 'register'">Already have an account? 
            <a (click)="toggleTab('login')" class="text-white hover:underline cursor-pointer">Sign in now.</a>
          </p>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent implements OnInit {
  tab: 'login' | 'register' = 'login';
  loginData = { username: '', password: '' };
  registerData = { username: '', password: '' };
  private apiUrl = 'http://127.0.0.1:8000/auth';

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.checkSession();
  }

  toggleTab(tabName: 'login' | 'register') {
    this.tab = tabName;
  }

  private checkSession() {
    const token = localStorage.getItem('token');
    if (token) {
      this.http.get(`${this.apiUrl}/me`, { headers: { Authorization: `Bearer ${token}` } })
        .subscribe({
          next: () => this.router.navigate(['/browse']),
          error: () => localStorage.removeItem('token') // Token inválido, remove
        });
    }
  }

  onLogin() {
    if (!this.loginData.username || !this.loginData.password) {
      this.notificationService.showNotification('Please fill in all fields.', 'warning');
      return;
    }

    this.http.post<{ access_token: string }>(`${this.apiUrl}/login`, this.loginData)
      .subscribe({
        next: (response) => {
          localStorage.setItem('token', response.access_token);
          this.notificationService.showNotification('Login successful!', 'success');
          this.router.navigate(['/browse']);
        },
        error: (err) => {
          console.error('Login error:', err);
          this.notificationService.showNotification('Login failed! Please check your credentials.', 'error');
        }
      });
  }

  onRegister() {
    if (!this.registerData.username || !this.registerData.password) {
      this.notificationService.showNotification('Please fill in all fields.', 'warning');
      return;
    }

    this.http.post(`${this.apiUrl}/register`, this.registerData)
      .subscribe({
        next: () => {
          this.notificationService.showNotification('User registered successfully!', 'success');
          this.toggleTab('login'); // Alterna para login após registro bem-sucedido
        },
        error: (err) => {
          console.error('Registration error:', err);
          this.notificationService.showNotification('Registration failed! Try a different username.', 'error');
        }
      });
  }
}
