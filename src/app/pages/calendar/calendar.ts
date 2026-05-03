import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { FitnessService } from '../../services/fitness';

interface WorkoutEntry {
  date: string;
  type: 'gym' | 'cardio' | 'rest';
  note: string;
  split: string;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css'
})
export class Calendar {
  activeView = signal<'week' | 'month'>('week');
  currentDate = signal(new Date());
  entries = signal<WorkoutEntry[]>([]);
  showModal = signal(false);
  selectedDate = signal('');
  selectedType = signal<'gym' | 'cardio' | 'rest'>('gym');
  selectedNote = '';
  selectedSplit = '';
  saved = signal(false);

  splits = [
    'PPL - Push', 'PPL - Pull', 'PPL - Legs',
    'Upper', 'Lower',
    'Arnold - Chest/Back', 'Arnold - Shoulders/Arms', 'Arnold - Legs',
    'Bro - Chest', 'Bro - Back', 'Bro - Shoulders', 'Bro - Arms', 'Bro - Legs'
  ];

  constructor(
    private authService: AuthService,
    private fitnessService: FitnessService
  ) {
    const saved = localStorage.getItem('marhaba_entries');
    if (saved) this.entries.set(JSON.parse(saved));
  }

  get weekDays(): Date[] {
    const date = new Date(this.currentDate());
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(date.setDate(diff));
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return d;
    });
  }

  get monthDays(): (Date | null)[] {
    const date = new Date(this.currentDate());
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const startPad = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
    const days: (Date | null)[] = Array(startPad).fill(null);
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(date.getFullYear(), date.getMonth(), i));
    }
    while (days.length % 7 !== 0) days.push(null);
    return days;
  }

  get currentMonthYear(): string {
    return this.currentDate().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  get currentWeekRange(): string {
    const days = this.weekDays;
    const start = days[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const end = days[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    return `${start} – ${end}`;
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  isToday(date: Date): boolean {
    return this.formatDate(date) === this.formatDate(new Date());
  }

  getEntry(date: Date): WorkoutEntry | undefined {
    return this.entries().find(e => e.date === this.formatDate(date));
  }

  getTypeColor(type: string): string {
    if (type === 'gym') return 'type-gym';
    if (type === 'cardio') return 'type-cardio';
    if (type === 'rest') return 'type-rest';
    return '';
  }

  openModal(date: Date) {
    this.selectedDate.set(this.formatDate(date));
    const existing = this.getEntry(date);
    if (existing) {
      this.selectedType.set(existing.type);
      this.selectedNote = existing.note;
      this.selectedSplit = existing.split;
    } else {
      this.selectedType.set('gym');
      this.selectedNote = '';
      this.selectedSplit = '';
    }
    this.showModal.set(true);
  }

  saveEntry() {
    const updated = this.entries().filter(e => e.date !== this.selectedDate());
    updated.push({
      date: this.selectedDate(),
      type: this.selectedType(),
      note: this.selectedNote,
      split: this.selectedSplit
    });
    this.entries.set(updated);
    localStorage.setItem('marhaba_entries', JSON.stringify(updated));
    this.authService.addExp(15);
    this.showModal.set(false);
    this.saved.set(true);
    setTimeout(() => this.saved.set(false), 3000);
  }

  removeEntry() {
    const updated = this.entries().filter(e => e.date !== this.selectedDate());
    this.entries.set(updated);
    localStorage.setItem('marhaba_entries', JSON.stringify(updated));
    this.showModal.set(false);
  }

  prev() {
    const d = new Date(this.currentDate());
    if (this.activeView() === 'week') {
      d.setDate(d.getDate() - 7);
    } else {
      d.setMonth(d.getMonth() - 1);
    }
    this.currentDate.set(d);
  }

  next() {
    const d = new Date(this.currentDate());
    if (this.activeView() === 'week') {
      d.setDate(d.getDate() + 7);
    } else {
      d.setMonth(d.getMonth() + 1);
    }
    this.currentDate.set(d);
  }

  today() {
    this.currentDate.set(new Date());
  }

  get gymCount() { return this.entries().filter(e => e.type === 'gym').length; }
  get cardioCount() { return this.entries().filter(e => e.type === 'cardio').length; }
  get restCount() { return this.entries().filter(e => e.type === 'rest').length; }
}