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
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./movies/movie-list-simple/movie-list-simple.component').then(
            (c) => c.MovieListSimpleComponent
          ),
      },
      {
        path: 'new',
        loadComponent: () =>
          import('./movies/movie-detail/movie-detail.component').then(
            (c) => c.MovieDetailComponent
          ),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./movies/movie-detail/movie-detail.component').then(
            (c) => c.MovieDetailComponent
          ),
      },
    ],
  },
  // {
  //   path: 'movies/:id',
  //   loadComponent: () =>
  //     import('./movies/movie-detail/movie-detail.component').then(
  //       (c) => c.MovieDetailComponent
  //     ),
  // },
];
