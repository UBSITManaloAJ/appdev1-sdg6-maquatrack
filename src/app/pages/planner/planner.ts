import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FitnessService } from '../../services/fitness';
import { ExerciseService } from '../../services/exercise';
import { WorkoutPlan, Exercise } from '../../models/water-data.model';

@Component({
  selector: 'app-planner',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './planner.html',
  styleUrl: './planner.css'
})
export class Planner implements OnInit {
  plan = signal<WorkoutPlan | null>(null);
  selectedDay = signal<any>(null);
  exerciseList: Exercise[] = [];
  loadingExercises = signal(false);
  hasPlan = signal(false);

  constructor(
    private fitnessService: FitnessService,
    private exerciseService: ExerciseService,
    private router: Router
  ) {}

  ngOnInit() {
    const saved = localStorage.getItem('marhaba_plan');
    if (saved) {
      this.plan.set(JSON.parse(saved));
      this.hasPlan.set(true);
    }
  }

  get setsReps() {
    const goal = localStorage.getItem('marhaba_goal') || 'build';
    return this.fitnessService.getSetsAndReps(goal);
  }

  selectDay(day: any) {
    if (day.isRest) return;
    this.selectedDay.set(day);
    this.loadingExercises.set(true);
    this.exerciseList = [];
    if (day.bodyParts.length > 0) {
      this.exerciseService.getExercisesByBodyPart(day.bodyParts[0], 6).subscribe({
        next: (data: Exercise[]) => {
          this.exerciseList = data;
          this.loadingExercises.set(false);
        },
        error: () => this.loadingExercises.set(false)
      });
    }
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  getDayClass(day: any): string {
    if (day.isRest) return 'day-rest';
    if (day.focus.toLowerCase().includes('push') || day.focus.toLowerCase().includes('chest')) return 'day-push';
    if (day.focus.toLowerCase().includes('pull') || day.focus.toLowerCase().includes('back')) return 'day-pull';
    if (day.focus.toLowerCase().includes('leg')) return 'day-legs';
    if (day.focus.toLowerCase().includes('upper')) return 'day-upper';
    if (day.focus.toLowerCase().includes('lower')) return 'day-lower';
    return 'day-full';
  }
}