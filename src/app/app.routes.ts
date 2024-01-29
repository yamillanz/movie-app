import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full',
  },
  {
    path: 'movies',
    loadComponent: () =>
      import('./movies/home-page/home-page.component').then(
        (c) => c.HomePageComponent
      ),
  },
];
