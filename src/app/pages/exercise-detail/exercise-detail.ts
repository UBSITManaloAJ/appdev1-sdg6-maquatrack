import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ExerciseService } from '../../services/exercise';
import { Exercise } from '../../models/water-data.model';

@Component({
  selector: 'app-exercise-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './exercise-detail.html',
  styleUrl: './exercise-detail.css'
})
export class ExerciseDetail implements OnInit {
  exercise = signal<Exercise | null>(null);
  isLoading = signal(true);

  constructor(
    private route: ActivatedRoute,
    private exerciseService: ExerciseService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.exerciseService.getExerciseById(id).subscribe({
      next: (ex: Exercise) => {
        this.exercise.set(ex);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }
}