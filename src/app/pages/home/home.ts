import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { FitnessService } from '../../services/fitness';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  constructor(
    public authService: AuthService,
    private fitnessService: FitnessService
  ) {}

  get workoutsLogged() {
    return this.fitnessService.getWorkoutLogs().length;
  }

  get challengesCompleted() {
    return this.fitnessService.getChallenges().filter(c => c.completed).length;
  }
}