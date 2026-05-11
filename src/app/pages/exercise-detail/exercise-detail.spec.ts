import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseDetail } from './exercise-detail';

describe('ExerciseDetail', () => {
  let component: ExerciseDetail;
  let fixture: ComponentFixture<ExerciseDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(ExerciseDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
