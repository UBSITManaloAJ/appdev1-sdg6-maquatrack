import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Planner } from './pages/planner/planner';
import { Exercises } from './pages/exercises/exercises';
import { ExerciseDetail } from './pages/exercise-detail/exercise-detail';
import { About } from './pages/about/about';
import { NotFound } from './pages/not-found/not-found';
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '',              component: Login },
  { path: 'login',         component: Login },
  { path: 'signup',        component: Signup },
  { path: 'home',          component: Home,           canActivate: [AuthGuard] },
  { path: 'planner',       component: Planner,        canActivate: [AuthGuard] },
  { path: 'exercises',     component: Exercises,      canActivate: [AuthGuard] },
  { path: 'exercises/:id', component: ExerciseDetail, canActivate: [AuthGuard] },
  { path: 'about',         component: About,          canActivate: [AuthGuard] },
  { path: '**',            component: NotFound }
];