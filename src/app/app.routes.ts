import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    // redirectTo: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./features/layout/layout.component').then(
        (module) => module.LayoutComponent
      ),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
