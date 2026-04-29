import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    if (username && password) {
      localStorage.setItem('maquatrack_user', username);
      localStorage.setItem('maquatrack_exp', '0');
      localStorage.setItem('maquatrack_streak', '1');
      this.addExp(5);
      return true;
    }
    return false;
  }

  signup(username: string, password: string): boolean {
    if (username && password) {
      localStorage.setItem('maquatrack_user', username);
      localStorage.setItem('maquatrack_exp', '0');
      localStorage.setItem('maquatrack_streak', '0');
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('maquatrack_user');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('maquatrack_user');
  }

  getUsername(): string {
    return localStorage.getItem('maquatrack_user') || 'User';
  }

  getExp(): number {
    return parseInt(localStorage.getItem('maquatrack_exp') || '0');
  }

  addExp(amount: number): void {
    const current = this.getExp();
    localStorage.setItem('maquatrack_exp', (current + amount).toString());
  }

  getRank(): string {
    const exp = this.getExp();
    if (exp >= 2000) return '👑 Elite';
    if (exp >= 1500) return '💎 Platinum';
    if (exp >= 1000) return '🥇 Gold';
    if (exp >= 600)  return '🥈 Silver';
    if (exp >= 300)  return '🥉 Bronze';
    if (exp >= 100)  return '⚙️ Iron';
    return '🩶 Beginner';
  }

  getStreak(): number {
    return parseInt(localStorage.getItem('maquatrack_streak') || '0');
  }
}