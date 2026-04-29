import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  username = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  login() {
    if (!this.username || !this.password) {
      this.error = 'Please fill in all fields.';
      return;
    }
    const success = this.authService.login(this.username, this.password);
    if (success) {
      this.router.navigate(['/home']);
    } else {
      this.error = 'Invalid credentials.';
    }
  }
}