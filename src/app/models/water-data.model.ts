export interface WaterData {
  country: string;
  region: string;
  population: number;
  flag: string;
  capital: string;
}

export interface WorkoutLog {
  id: number;
  exercise: string;
  sets: number;
  reps: number;
  weight: number;
  date: string;
  split: string;
  exp: number;
}

export interface Challenge {
  id: number;
  title: string;
  description: string;
  exp: number;
  completed: boolean;
  icon: string;
}

export interface UserProfile {
  name: string;
  totalExp: number;
  rank: string;
  streak: number;
  workoutsLogged: number;
  waterGoalsMet: number;
  challengesCompleted: number;
}