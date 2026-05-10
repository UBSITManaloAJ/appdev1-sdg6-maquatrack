import { Injectable } from '@angular/core';
import { WorkoutPlan, DaySchedule } from '../models/water-data.model';

@Injectable({
  providedIn: 'root'
})
export class FitnessService {

  getWorkoutPlan(days: number, goal: string): WorkoutPlan {
    const plans: Record<string, WorkoutPlan> = {

      '2_any': {
        days: 2,
        goal,
        splitName: 'Full Body Split',
        splitDescription: 'Train your entire body in each session. Perfect for beginners with limited time. Each muscle group gets trained twice per week for optimal growth.',
        schedule: [
          { day: 'Monday', focus: 'Full Body A', bodyParts: ['chest', 'back', 'legs', 'shoulders'], isRest: false },
          { day: 'Tuesday', focus: 'Rest', bodyParts: [], isRest: true },
          { day: 'Wednesday', focus: 'Rest', bodyParts: [], isRest: true },
          { day: 'Thursday', focus: 'Full Body B', bodyParts: ['chest', 'back', 'legs', 'arms'], isRest: false },
          { day: 'Friday', focus: 'Rest', bodyParts: [], isRest: true },
          { day: 'Saturday', focus: 'Rest', bodyParts: [], isRest: true },
          { day: 'Sunday', focus: 'Rest', bodyParts: [], isRest: true },
        ]
      },

      '3_build': {
        days: 3,
        goal,
        splitName: 'Push Pull Legs',
        splitDescription: 'Classic PPL split. Push day targets chest, shoulders and triceps. Pull day targets back and biceps. Leg day targets quads, hamstrings and calves.',
        schedule: [
          { day: 'Monday', focus: 'Push — Chest, Shoulders, Triceps', bodyParts: ['chest', 'shoulders'], isRest: false },
          { day: 'Tuesday', focus: 'Rest', bodyParts: [], isRest: true },
          { day: 'Wednesday', focus: 'Pull — Back, Biceps', bodyParts: ['back', 'upper arms'], isRest: false },
          { day: 'Thursday', focus: 'Rest', bodyParts: [], isRest: true },
          { day: 'Friday', focus: 'Legs — Quads, Hamstrings, Calves', bodyParts: ['upper legs', 'lower legs'], isRest: false },
          { day: 'Saturday', focus: 'Rest', bodyParts: [], isRest: true },
          { day: 'Sunday', focus: 'Rest', bodyParts: [], isRest: true },
        ]
      },

      '3_strength': {
        days: 3,
        goal,
        splitName: 'Full Body Strength',
        splitDescription: 'Three full body sessions focused on compound movements. Perfect for building strength with adequate recovery between sessions.',
        schedule: [
          { day: 'Monday', focus: 'Full Body — Compound Focus', bodyParts: ['chest', 'back', 'legs'], isRest: false },
          { day: 'Tuesday', focus: 'Rest', bodyParts: [], isRest: true },
          { day: 'Wednesday', focus: 'Full Body — Compound Focus', bodyParts: ['chest', 'back', 'legs'], isRest: false },
          { day: 'Thursday', focus: 'Rest', bodyParts: [], isRest: true },
          { day: 'Friday', focus: 'Full Body — Compound Focus', bodyParts: ['chest', 'back', 'legs'], isRest: false },
          { day: 'Saturday', focus: 'Rest', bodyParts: [], isRest: true },
          { day: 'Sunday', focus: 'Rest', bodyParts: [], isRest: true },
        ]
      },

      '4_any': {
        days: 4,
        goal,
        splitName: 'Upper Lower Split',
        splitDescription: 'Alternates between upper body and lower body sessions. Great balance between volume and recovery. Each muscle group trained twice per week.',
        schedule: [
          { day: 'Monday', focus: 'Upper Body — Chest, Back, Shoulders, Arms', bodyParts: ['chest', 'back', 'shoulders', 'upper arms'], isRest: false },
          { day: 'Tuesday', focus: 'Lower Body — Quads, Hamstrings, Calves', bodyParts: ['upper legs', 'lower legs'], isRest: false },
          { day: 'Wednesday', focus: 'Rest', bodyParts: [], isRest: true },
          { day: 'Thursday', focus: 'Upper Body — Chest, Back, Shoulders, Arms', bodyParts: ['chest', 'back', 'shoulders', 'upper arms'], isRest: false },
          { day: 'Friday', focus: 'Lower Body — Quads, Hamstrings, Calves', bodyParts: ['upper legs', 'lower legs'], isRest: false },
          { day: 'Saturday', focus: 'Rest', bodyParts: [], isRest: true },
          { day: 'Sunday', focus: 'Rest', bodyParts: [], isRest: true },
        ]
      },

      '5_build': {
        days: 5,
        goal,
        splitName: 'Bro Split',
        splitDescription: 'Classic bodybuilding split. Each muscle group gets its own dedicated day for maximum volume and focus. Best for intermediate to advanced lifters.',
        schedule: [
          { day: 'Monday', focus: 'Chest Day', bodyParts: ['chest'], isRest: false },
          { day: 'Tuesday', focus: 'Back Day', bodyParts: ['back'], isRest: false },
          { day: 'Wednesday', focus: 'Shoulders Day', bodyParts: ['shoulders'], isRest: false },
          { day: 'Thursday', focus: 'Arms Day — Biceps & Triceps', bodyParts: ['upper arms'], isRest: false },
          { day: 'Friday', focus: 'Legs Day', bodyParts: ['upper legs', 'lower legs'], isRest: false },
          { day: 'Saturday', focus: 'Rest', bodyParts: [], isRest: true },
          { day: 'Sunday', focus: 'Rest', bodyParts: [], isRest: true },
        ]
      },

      '6_build': {
        days: 6,
        goal,
        splitName: 'Advanced PPL',
        splitDescription: 'Push Pull Legs done twice per week. Maximum volume for each muscle group. Best for advanced lifters who can handle high training frequency.',
        schedule: [
          { day: 'Monday', focus: 'Push — Chest, Shoulders, Triceps', bodyParts: ['chest', 'shoulders'], isRest: false },
          { day: 'Tuesday', focus: 'Pull — Back, Biceps', bodyParts: ['back', 'upper arms'], isRest: false },
          { day: 'Wednesday', focus: 'Legs', bodyParts: ['upper legs', 'lower legs'], isRest: false },
          { day: 'Thursday', focus: 'Push — Chest, Shoulders, Triceps', bodyParts: ['chest', 'shoulders'], isRest: false },
          { day: 'Friday', focus: 'Pull — Back, Biceps', bodyParts: ['back', 'upper arms'], isRest: false },
          { day: 'Saturday', focus: 'Legs', bodyParts: ['upper legs', 'lower legs'], isRest: false },
          { day: 'Sunday', focus: 'Rest', bodyParts: [], isRest: true },
        ]
      }
    };

    const key = `${days}_${goal}`;
    return plans[key] || plans[`${days}_any`] || plans['3_build'];
  }

  getSetsAndReps(goal: string): { sets: number; reps: string; rest: string } {
    if (goal === 'strength') return { sets: 5, reps: '3-5', rest: '3-5 min' };
    if (goal === 'build') return { sets: 4, reps: '8-12', rest: '60-90 sec' };
    if (goal === 'lose') return { sets: 3, reps: '15-20', rest: '30-45 sec' };
    return { sets: 3, reps: '10-15', rest: '60 sec' };
  }
}