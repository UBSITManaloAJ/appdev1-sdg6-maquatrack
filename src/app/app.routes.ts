import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Dashboard } from './pages/dashboard/dashboard';
import { Tracker } from './pages/tracker/tracker';
import { SdgInfo } from './pages/sdg-info/sdg-info';
import { NotFound } from './pages/not-found/not-found';
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';
import { Workout } from './pages/workout/workout';
import { Challenges } from './pages/challenges/challenges';
import { Calendar } from './pages/calendar/calendar';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '',           component: Login },
  { path: 'login',      component: Login },
  { path: 'signup',     component: Signup },
  { path: 'home',       component: Home,       canActivate: [AuthGuard] },
  { path: 'dashboard',  component: Dashboard,  canActivate: [AuthGuard] },
  { path: 'tracker',    component: Tracker,    canActivate: [AuthGuard] },
  { path: 'workout',    component: Workout,    canActivate: [AuthGuard] },
  { path: 'challenges', component: Challenges, canActivate: [AuthGuard] },
  { path: 'calendar',   component: Calendar,   canActivate: [AuthGuard] },
  { path: 'sdg-info',   component: SdgInfo,    canActivate: [AuthGuard] },
  { path: '**',         component: NotFound }
];