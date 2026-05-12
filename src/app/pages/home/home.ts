import { Component, signal, effect } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FitnessService } from '../../services/fitness';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  selectedDays = signal(0);
  selectedGoal = signal('');
  step = signal(1);

  days = [
    { value: 2, label: '2 Days', sub: 'Beginner friendly' },
    { value: 3, label: '3 Days', sub: 'Most popular' },
    { value: 4, label: '4 Days', sub: 'Intermediate' },
    { value: 5, label: '5 Days', sub: 'Advanced' },
    { value: 6, label: '6 Days', sub: 'Dedicated' },
  ];

  goals = [
    { value: 'build', label: '💪 Build Muscle', sub: 'Hypertrophy focused' },
    { value: 'strength', label: '🏋️ Gain Strength', sub: 'Heavy compound lifts' },
    { value: 'lose', label: '🔥 Lose Weight', sub: 'High volume training' },
    { value: 'fitness', label: '🏃 General Fitness', sub: 'Overall health' },
  ];

  constructor(
    private router: Router,
    private fitnessService: FitnessService,
    public authService: AuthService
  ) {
    effect(() => {
      if (this.selectedDays() > 0) {
        console.clear();
      }
    });
  }

  selectDays(days: number) {
    this.selectedDays.set(days);
    this.step.set(2);
  }

  selectGoal(goal: string) {
    this.selectedGoal.set(goal);
    this.generatePlan();
  }

  generatePlan() {
    const plan = this.fitnessService.getWorkoutPlan(
      this.selectedDays(),
      this.selectedGoal()
    );
    localStorage.setItem('marhaba_plan', JSON.stringify(plan));
    localStorage.setItem('marhaba_days', this.selectedDays().toString());
    localStorage.setItem('marhaba_goal', this.selectedGoal());
    this.router.navigate(['/planner']);
  }

  reset() {
    this.step.set(1);
    this.selectedDays.set(0);
    this.selectedGoal.set('');
  }
}