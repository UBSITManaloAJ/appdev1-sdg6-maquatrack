import { Component } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Observable, startWith, map, catchError, of } from 'rxjs';
import { WaterDataService } from '../../services/water-data';
import { WaterData } from '../../models/water-data.model';

interface DashboardState {
  data: WaterData[];
  loading: boolean;
  error: boolean;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  state$: Observable<DashboardState>;

  constructor(private waterDataService: WaterDataService) {
    this.state$ = this.waterDataService.getWaterData().pipe(
      map(data => ({ data, loading: false, error: false })),
      catchError(() => of({ data: [], loading: false, error: true })),
      startWith({ data: [], loading: true, error: false })
    );
  }
}