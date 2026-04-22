import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaterDataService } from '../../services/water-data';
import { WaterData } from '../../models/water-data.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  waterData: WaterData[] = [];
  isLoading = true;
  hasError = false;

  constructor(private waterDataService: WaterDataService) {}

  ngOnInit() {
    this.waterDataService.getWaterData().subscribe({
      next: (data) => {
        this.waterData = data.slice(0, 12);
        this.isLoading = false;
      },
      error: () => {
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }
}