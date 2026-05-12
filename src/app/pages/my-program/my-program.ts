import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface CustomDay {
  id: number;
  name: string;
  focus: string;
}

interface ExerciseSet {
  reps: number;
  weight: string;
}

interface LoggedExercise {
  id: number;
  name: string;
  sets: ExerciseSet[];
  note: string;
}

interface WorkoutSession {
  id: number;
  date: string;
  dayName: string;
  exercises: LoggedExercise[];
}

@Component({
  selector: 'app-my-program',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-program.html',
  styleUrl: './my-program.css'
})
export class MyProgram {
  activeTab = signal<'split' | 'log'>('split');

  // Split builder
  splitName = '';
  days: CustomDay[] = [];
  newDayName = '';
  newDayFocus = '';
  splitSaved = signal(false);

  // Workout log
  sessions: WorkoutSession[] = [];
  selectedDay = signal<CustomDay | null>(null);
  currentExercises: LoggedExercise[] = [];
  newExerciseName = '';
  newSets = 3;
  newReps = 10;
  newWeight = '';
  newNote = '';
  logSaved = signal(false);
  showHistory = signal(false);

  constructor() {
    this.loadSplit();
    this.loadSessions();
  }

  // ---- SPLIT BUILDER ----
  loadSplit() {
    const saved = localStorage.getItem('marhaba_custom_split');
    if (saved) {
      const data = JSON.parse(saved);
      this.splitName = data.name || '';
      this.days = data.days || [];
    }
  }

  addDay() {
    if (!this.newDayName) return;
    this.days.push({
      id: Date.now(),
      name: this.newDayName,
      focus: this.newDayFocus
    });
    this.newDayName = '';
    this.newDayFocus = '';
  }

  removeDay(id: number) {
    this.days = this.days.filter(d => d.id !== id);
  }

  saveSplit() {
    if (!this.splitName) return;
    localStorage.setItem('marhaba_custom_split', JSON.stringify({
      name: this.splitName,
      days: this.days
    }));
    this.splitSaved.set(true);
    setTimeout(() => this.splitSaved.set(false), 3000);
  }

  // ---- WORKOUT LOG ----
  loadSessions() {
    const saved = localStorage.getItem('marhaba_sessions');
    this.sessions = saved ? JSON.parse(saved) : [];
  }

  selectDay(day: CustomDay) {
    this.selectedDay.set(day);
    this.currentExercises = [];
    this.activeTab.set('log');
  }

  addExercise() {
    if (!this.newExerciseName) return;
    const sets: ExerciseSet[] = Array.from({ length: this.newSets }, () => ({
      reps: this.newReps,
      weight: this.newWeight || 'BW'
    }));
    this.currentExercises.push({
      id: Date.now(),
      name: this.newExerciseName,
      sets,
      note: this.newNote
    });
    this.newExerciseName = '';
    this.newWeight = '';
    this.newNote = '';
  }

  removeExercise(id: number) {
    this.currentExercises = this.currentExercises.filter(e => e.id !== id);
  }

  saveSession() {
    if (!this.selectedDay() || this.currentExercises.length === 0) return;
    const session: WorkoutSession = {
      id: Date.now(),
      date: new Date().toLocaleDateString('en-US', {
        weekday: 'short', month: 'short', day: 'numeric'
      }),
      dayName: this.selectedDay()!.name,
      exercises: [...this.currentExercises]
    };
    this.sessions.unshift(session);
    localStorage.setItem('marhaba_sessions', JSON.stringify(this.sessions));
    this.currentExercises = [];
    this.selectedDay.set(null);
    this.logSaved.set(true);
    setTimeout(() => this.logSaved.set(false), 3000);
  }

  deleteSession(id: number) {
    this.sessions = this.sessions.filter(s => s.id !== id);
    localStorage.setItem('marhaba_sessions', JSON.stringify(this.sessions));
  }

  getLastSession(dayName: string): WorkoutSession | undefined {
    return this.sessions.find(s => s.dayName === dayName);
  }
}