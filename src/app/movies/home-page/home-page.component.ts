import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MovieListSimpleComponent } from '../movie-list-simple/movie-list-simple.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    MovieListSimpleComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {}
