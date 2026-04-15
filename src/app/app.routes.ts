import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Dashboard } from './pages/dashboard/dashboard';
import { Tracker } from './pages/tracker/tracker';
import { SdgInfo } from './pages/sdg-info/sdg-info';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  { path: '',          component: Home },
  { path: 'home',      component: Home },
  { path: 'dashboard', component: Dashboard },
  { path: 'tracker',   component: Tracker },
  { path: 'sdg-info',  component: SdgInfo },
  { path: '**',        component: NotFound }
];