import { Injectable } from '@angular/core';
import { WorkoutLog, Challenge } from '../models/water-data.model';

@Injectable({
  providedIn: 'root'
})
export class FitnessService {

  getSplitExercises(split: string): string[] {
    const splits: Record<string, string[]> = {
      'PPL - Push': ['Bench Press', 'Overhead Press', 'Incline Dumbbell Press', 'Tricep Pushdown', 'Lateral Raises'],
      'PPL - Pull': ['Deadlift', 'Pull-ups', 'Barbell Row', 'Face Pulls', 'Bicep Curls'],
      'PPL - Legs': ['Squat', 'Romanian Deadlift', 'Leg Press', 'Leg Curl', 'Calf Raises'],
      'Upper': ['Bench Press', 'Pull-ups', 'Overhead Press', 'Barbell Row', 'Bicep Curls', 'Tricep Pushdown'],
      'Lower': ['Squat', 'Deadlift', 'Leg Press', 'Leg Curl', 'Calf Raises'],
      'Arnold - Chest/Back': ['Bench Press', 'Incline Press', 'Pull-ups', 'Barbell Row', 'Cable Fly'],
      'Arnold - Shoulders/Arms': ['Overhead Press', 'Lateral Raises', 'Bicep Curls', 'Tricep Pushdown', 'Face Pulls'],
      'Arnold - Legs': ['Squat', 'Leg Press', 'Leg Curl', 'Calf Raises', 'Lunges'],
      'Bro - Chest': ['Bench Press', 'Incline Press', 'Cable Fly', 'Dips', 'Push-ups'],
      'Bro - Back': ['Pull-ups', 'Barbell Row', 'Lat Pulldown', 'Seated Row', 'Deadlift'],
      'Bro - Shoulders': ['Overhead Press', 'Lateral Raises', 'Front Raises', 'Face Pulls', 'Shrugs'],
      'Bro - Arms': ['Bicep Curls', 'Hammer Curls', 'Tricep Pushdown', 'Skull Crushers', 'Dips'],
      'Bro - Legs': ['Squat', 'Leg Press', 'Leg Curl', 'Calf Raises', 'Lunges'],
    };
    return splits[split] || [];
  }

  getWorkoutLogs(): WorkoutLog[] {
    const logs = localStorage.getItem('maquatrack_workouts');
    return logs ? JSON.parse(logs) : [];
  }

  saveWorkoutLog(log: WorkoutLog): void {
    const logs = this.getWorkoutLogs();
    logs.push(log);
    localStorage.setItem('maquatrack_workouts', JSON.stringify(logs));
  }

  getChallenges(): Challenge[] {
    const saved = localStorage.getItem('maquatrack_challenges');
    if (saved) return JSON.parse(saved);

    const defaults: Challenge[] = [
      { id: 1, title: '💧 Hydration Hero', description: 'Hit your water goal 3 days in a row', exp: 50, completed: false, icon: '💧' },
      { id: 2, title: '🏃 10K Runner', description: 'Run or walk 10km total', exp: 100, completed: false, icon: '🏃' },
      { id: 3, title: '💪 First Workout', description: 'Log your first workout', exp: 30, completed: false, icon: '💪' },
      { id: 4, title: '🔥 3-Day Streak', description: 'Log in 3 days in a row', exp: 40, completed: false, icon: '🔥' },
      { id: 5, title: '📅 Weekly Planner', description: 'Plan your full week on the calendar', exp: 20, completed: false, icon: '📅' },
      { id: 6, title: '🏋️ Heavy Lifter', description: 'Log a workout with 5+ exercises', exp: 60, completed: false, icon: '🏋️' },
    ];
    localStorage.setItem('maquatrack_challenges', JSON.stringify(defaults));
    return defaults;
  }

  completeChallenge(id: number): Challenge[] {
    const challenges = this.getChallenges();
    const updated = challenges.map(c => c.id === id ? { ...c, completed: true } : c);
    localStorage.setItem('maquatrack_challenges', JSON.stringify(updated));
    return updated;
  }
}