import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'posts',
    pathMatch: 'full',
  },
  {
    path: 'posts',
    loadComponent: () =>
      import('./features/layout/layout.component').then(
        (module) => module.LayoutComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/pages/post-list/post-list.component').then(
            (module) => module.PostListComponent
          ),
      },
      {
        path: 'favorites',
        loadComponent: () =>
          import('./features/pages/favorites/favorites.component').then(
            (module) => module.FavoritesComponent
          ),
      },
      {
        path: 'not-found',
        loadComponent: () =>
          import('./features/pages/not-found/not-found.component').then(
            (module) => module.NotFoundComponent
          ),
      },
    ],
  },
  {
    path: 'details/:id',
    loadComponent: () =>
      import('./features/pages/post-details/post-details.component').then(
        (module) => module.PostDetailsComponent
      ),
  },
  { path: '**', redirectTo: 'posts/not-found' },
];
