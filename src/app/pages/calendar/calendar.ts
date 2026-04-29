import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';

interface DayPlan {
  day: string;
  type: 'gym' | 'rest' | 'cardio' | '';
  note: string;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css'
})
export class Calendar {
  days: DayPlan[] = [
    { day: 'Monday',    type: '', note: '' },
    { day: 'Tuesday',   type: '', note: '' },
    { day: 'Wednesday', type: '', note: '' },
    { day: 'Thursday',  type: '', note: '' },
    { day: 'Friday',    type: '', note: '' },
    { day: 'Saturday',  type: '', note: '' },
    { day: 'Sunday',    type: '', note: '' },
  ];

  saved = signal(false);

  constructor(private authService: AuthService) {
    const stored = localStorage.getItem('maquatrack_calendar');
    if (stored) this.days = JSON.parse(stored);
  }

  savePlan() {
    localStorage.setItem('maquatrack_calendar', JSON.stringify(this.days));
    this.authService.addExp(15);
    this.saved.set(true);
    setTimeout(() => this.saved.set(false), 3000);
  }

  get gymDays() { return this.days.filter(d => d.type === 'gym').length; }
  get restDays() { return this.days.filter(d => d.type === 'rest').length; }
  get cardioDays() { return this.days.filter(d => d.type === 'cardio').length; }

  getDayClass(type: string): string {
    if (type === 'gym') return 'day-gym';
    if (type === 'rest') return 'day-rest';
    if (type === 'cardio') return 'day-cardio';
    return '';
  }
}