import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ExerciseService } from '../../services/exercise';
import { Exercise } from '../../models/water-data.model';
import { ExerciseCard } from '../../components/exercise-card/exercise-card';

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [CommonModule, FormsModule, ExerciseCard],
  templateUrl: './exercises.html',
  styleUrl: './exercises.css'
})
export class Exercises implements OnInit {
  exerciseList: Exercise[] = [];
  selectedBodyPart = signal('chest');
  searchQuery = signal('');
  isLoading = signal(true);

  bodyPartList = [
    'chest', 'back', 'shoulders', 'upper arms',
    'lower arms', 'upper legs', 'lower legs', 'waist', 'cardio', 'neck'
  ];

  constructor(
    private exerciseService: ExerciseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadExercises('chest');
  }

  loadExercises(bodyPart: string) {
    this.selectedBodyPart.set(bodyPart);
    this.isLoading.set(true);
    this.exerciseService.getExercisesByBodyPart(bodyPart, 20).subscribe({
      next: (data: Exercise[]) => {
        this.exerciseList = data;
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  search() {
    if (!this.searchQuery()) {
      this.loadExercises(this.selectedBodyPart());
      return;
    }
    this.isLoading.set(true);
    this.exerciseService.searchExercises(this.searchQuery()).subscribe({
      next: (data: Exercise[]) => {
        this.exerciseList = data;
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  goToDetail(id: string) {
    this.router.navigate(['/exercises', id]);
  }
}