import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FitnessService } from '../../services/fitness';
import { AuthService } from '../../services/auth';
import { Challenge } from '../../models/water-data.model';

@Component({
  selector: 'app-challenges',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './challenges.html',
  styleUrl: './challenges.css'
})
export class Challenges {
  challenges = signal<Challenge[]>([]);

  constructor(
    private fitnessService: FitnessService,
    private authService: AuthService
  ) {
    this.challenges.set(this.fitnessService.getChallenges());
  }

  complete(id: number, exp: number, completed: boolean) {
    if (completed) return;
    const updated = this.fitnessService.completeChallenge(id);
    this.challenges.set(updated);
    this.authService.addExp(exp);
  }

  get totalExp() { return this.authService.getExp(); }
  get rank() { return this.authService.getRank(); }
  get completedCount() { return this.challenges().filter(c => c.completed).length; }
}