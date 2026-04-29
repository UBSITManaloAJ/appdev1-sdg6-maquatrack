import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FitnessService } from '../../services/fitness';
import { AuthService } from '../../services/auth';
import { WorkoutLog } from '../../models/water-data.model';

@Component({
  selector: 'app-workout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './workout.html',
  styleUrl: './workout.css'
})
export class Workout {
  selectedSplit = '';
  exercise = '';
  sets = 3;
  reps = 10;
  weight = 0;
  logs = signal<WorkoutLog[]>([]);

  splits = [
    'PPL - Push', 'PPL - Pull', 'PPL - Legs',
    'Upper', 'Lower',
    'Arnold - Chest/Back', 'Arnold - Shoulders/Arms', 'Arnold - Legs',
    'Bro - Chest', 'Bro - Back', 'Bro - Shoulders', 'Bro - Arms', 'Bro - Legs'
  ];

  totalVolume = computed(() =>
    this.logs().reduce((sum, l) => sum + (l.sets * l.reps * l.weight), 0)
  );

  constructor(
    private fitnessService: FitnessService,
    private authService: AuthService
  ) {
    this.logs.set(this.fitnessService.getWorkoutLogs());
  }

  get suggestedExercises(): string[] {
    return this.fitnessService.getSplitExercises(this.selectedSplit);
  }

  selectExercise(ex: string) {
    this.exercise = ex;
  }

  addLog() {
    if (!this.exercise || this.sets <= 0 || this.reps <= 0) return;
    const log: WorkoutLog = {
      id: Date.now(),
      exercise: this.exercise,
      sets: this.sets,
      reps: this.reps,
      weight: this.weight,
      date: new Date().toLocaleDateString(),
      split: this.selectedSplit,
      exp: 30
    };
    this.fitnessService.saveWorkoutLog(log);
    this.logs.set(this.fitnessService.getWorkoutLogs());
    this.authService.addExp(30);
    this.exercise = '';
    this.weight = 0;
  }
}