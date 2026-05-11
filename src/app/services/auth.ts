import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    const users = this.getUsers();
    const user = users.find(
      (u: any) => u.username === username && u.password === password
    );
    if (user) {
      localStorage.setItem('marhaba_user', username);
      return true;
    }
    return false;
  }

  signup(username: string, password: string): boolean {
    const users = this.getUsers();
    const exists = users.find((u: any) => u.username === username);
    if (exists) return false;
    users.push({ username, password });
    localStorage.setItem('marhaba_accounts', JSON.stringify(users));
    localStorage.setItem('marhaba_user', username);
    return true;
  }

  logout(): void {
    localStorage.removeItem('marhaba_user');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('marhaba_user');
  }

  getUsername(): string {
    return localStorage.getItem('marhaba_user') || 'User';
  }

  getRank(): string { return ''; }
  getExp(): number { return 0; }
  getStreak(): number { return 0; }
  addExp(amount: number): void {}

  private getUsers(): any[] {
    const users = localStorage.getItem('marhaba_accounts');
    return users ? JSON.parse(users) : [];
  }
}