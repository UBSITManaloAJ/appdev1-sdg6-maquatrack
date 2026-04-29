import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, map } from 'rxjs';
import { WaterData } from '../models/water-data.model';

@Injectable({
  providedIn: 'root'
})
export class WaterDataService {
  private apiUrl = 'https://restcountries.com/v3.1/region/asia';

  constructor(private http: HttpClient) {}

  getWaterData(): Observable<WaterData[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(countries => countries.map(c => ({
        country: c.name.common,
        region: c.subregion || 'Asia',
        population: c.population,
        flag: c.flags.png,
        capital: c.capital?.[0] || 'N/A'
      })).slice(0, 12)),
      catchError(() => of([]))
    );
  }
}