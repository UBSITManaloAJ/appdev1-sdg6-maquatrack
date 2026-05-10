import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, map } from 'rxjs';
import { Exercise } from '../models/water-data.model';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private apiUrl = 'https://exercisedb.p.rapidapi.com';
  private apiKey = '770101d903msh2c7cc532cdf44afp13c9f6jsn6091c67d00d7';
  private headers = new HttpHeaders({
    'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
    'x-rapidapi-key': this.apiKey
  });

  constructor(private http: HttpClient) {}

  getImageUrl(exerciseId: string): string {
    return `${this.apiUrl}/image?exerciseId=${exerciseId}&resolution=360&rapidapi-key=${this.apiKey}`;
  }

  getExercisesByBodyPart(bodyPart: string, limit = 20): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(
      `${this.apiUrl}/exercises/bodyPart/${bodyPart}?limit=${limit}&offset=0`,
      { headers: this.headers }
    ).pipe(
      map((exercises: Exercise[]) => exercises.map(ex => ({
        ...ex,
        gifUrl: this.getImageUrl(ex.id)
      }))),
      catchError(() => of([]))
    );
  }

  getExerciseById(id: string): Observable<Exercise> {
    return this.http.get<Exercise>(
      `${this.apiUrl}/exercises/exercise/${id}`,
      { headers: this.headers }
    ).pipe(
      map((ex: Exercise) => ({
        ...ex,
        gifUrl: this.getImageUrl(ex.id)
      }))
    );
  }

  searchExercises(name: string): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(
      `${this.apiUrl}/exercises/name/${name}?limit=20&offset=0`,
      { headers: this.headers }
    ).pipe(
      map((exercises: Exercise[]) => exercises.map(ex => ({
        ...ex,
        gifUrl: this.getImageUrl(ex.id)
      }))),
      catchError(() => of([]))
    );
  }
}