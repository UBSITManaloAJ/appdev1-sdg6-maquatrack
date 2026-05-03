import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';

interface HydrationLog {
  id: number;
  activity: string;
  liters: number;
  time: string;
}

@Component({
  selector: 'app-tracker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tracker.html',
  styleUrl: './tracker.css'
})
export class Tracker {
  activity = '';
  liters = 0;
  logs = signal<HydrationLog[]>([]);

  totalLiters = computed(() =>
    this.logs().reduce((sum, log) => sum + log.liters, 0)
  );

  dailyGoal = 3;

  progressPercent = computed(() =>
    Math.min((this.totalLiters() / this.dailyGoal) * 100, 100)
  );

  activities = [
    'Water', 'Sports Drink', 'Protein Shake',
    'Juice', 'Coconut Water', 'Other'
  ];

  constructor(private authService: AuthService) {}

  addLog() {
    if (!this.activity || this.liters <= 0) return;
    this.logs.update(logs => [...logs, {
      id: Date.now(),
      activity: this.activity,
      liters: this.liters,
      time: new Date().toLocaleTimeString()
    }]);
    this.authService.addExp(10);
    this.activity = '';
    this.liters = 0;
  }

  removeLog(id: number) {
    this.logs.update(logs => logs.filter(l => l.id !== id));
  }
}