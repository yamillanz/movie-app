import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MovieListComponent } from '../movie-list/movie-list.component';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    RouterOutlet,
    MovieListComponent,
    MatSidenavModule,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {}
