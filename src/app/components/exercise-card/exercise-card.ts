import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Exercise } from '../../models/water-data.model';

@Component({
  selector: 'app-exercise-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exercise-card.html',
  styleUrl: './exercise-card.css'
})
export class ExerciseCard {
  @Input() exercise!: Exercise;
  @Output() cardClicked = new EventEmitter<string>();

  onClick() {
    this.cardClicked.emit(this.exercise.id);
  }
}