import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Dashboard } from './pages/dashboard/dashboard';
import { Tracker } from './pages/tracker/tracker';
import { SdgInfo } from './pages/sdg-info/sdg-info';
import { NotFound } from './pages/not-found/not-found';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '',          component: Home },
  { path: 'home',      component: Home },
  { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] },
  { path: 'tracker',   component: Tracker, canActivate: [AuthGuard] },
  { path: 'tracker/:id', component: Tracker, canActivate: [AuthGuard] },
  { path: 'sdg-info',  component: SdgInfo },
  { path: '**',        component: NotFound }
];