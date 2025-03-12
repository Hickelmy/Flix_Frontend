import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center justify-center min-h-screen bg-cover bg-center" 
         style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f562aaf4-5dbb-4603-a32b-6ef6c2230136/dh0w8qv-9d8ee6b2-b41a-4681-ab9b-8a227560dc75.jpg/v1/fill/w_1280,h_720,q_75,strp/the_netflix_login_background__canada__2024___by_logofeveryt_dh0w8qv-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvZjU2MmFhZjQtNWRiYi00NjAzLWEzMmItNmVmNmMyMjMwMTM2XC9kaDB3OHF2LTlkOGVlNmIyLWI0MWEtNDY4MS1hYjliLThhMjI3NTYwZGM3NS5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.LOYKSxIDqfPwWHR0SSJ-ugGQ6bECF0yO6Cmc0F26CQs');">
      <div class="w-full max-w-md bg-black bg-opacity-75 p-8 rounded-md">
        <h1 class="text-white text-2xl font-bold mb-6">Sign In</h1>
        <form class="flex flex-col">
          <input type="text" placeholder="Email or phone number" 
                 class="p-3 mb-3 bg-gray-800 text-white rounded outline-none focus:ring-2 focus:ring-red-600" required>
          <input type="password" placeholder="Password" 
                 class="p-3 mb-3 bg-gray-800 text-white rounded outline-none focus:ring-2 focus:ring-red-600" required>
          <button class="bg-red-600 hover:bg-red-700 text-white p-3 rounded font-bold">Sign In</button>
        </form>
        <div class="flex justify-between items-center text-gray-400 text-sm mt-4">
          <label><input type="checkbox" class="mr-1"> Remember me</label>
          <a href="#" class="hover:underline">Need Help?</a>
        </div>
        <div class="text-gray-400 text-sm mt-6">
          <p>New to Netflix? <a href="#" class="text-white hover:underline">Sign up now.</a></p>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {}
