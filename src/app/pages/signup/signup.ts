import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
  username = '';
  password = '';
  confirm = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  signup() {
    if (!this.username || !this.password || !this.confirm) {
      this.error = 'Please fill in all fields.';
      return;
    }
    if (this.password !== this.confirm) {
      this.error = 'Passwords do not match.';
      return;
    }
    const success = this.authService.signup(this.username, this.password);
    if (success) {
      this.router.navigate(['/home']);
    }
  }
}