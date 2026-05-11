export interface Exercise {
  id: string;
  name: string;
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  target: string;
  secondaryMuscles: string[];
  instructions: string[];
}

export interface WorkoutPlan {
  days: number;
  goal: string;
  splitName: string;
  splitDescription: string;
  schedule: DaySchedule[];
}

export interface DaySchedule {
  day: string;
  focus: string;
  bodyParts: string[];
  isRest: boolean;
}

export interface UserPreference {
  daysPerWeek: number;
  goal: string;
}