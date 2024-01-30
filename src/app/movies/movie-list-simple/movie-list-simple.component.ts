import { Component, OnInit } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MoviesApiService } from '../services/movies-api.service';
import { MovieDTO } from '../models/movies';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-movie-list-simple',
  standalone: true,
  templateUrl: './movie-list-simple.component.html',
  styleUrl: './movie-list-simple.component.scss',
  imports: [MatTableModule, MatButtonModule, MatIconModule],
})
export class MovieListSimpleComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'image', 'year', 'actions'];
  // dataSource: MovieDTO[] = [];
  dataSource!: MatTableDataSource<MovieDTO>;

  constructor(
    private moviesSevice: MoviesApiService,
    public dialog: MatDialog
  ) {
    // this.moviesSevice.getMovies({}).subscribe((movies) => {
    //   console.log(movies.movies);
    //   this.dataSource = new MatTableDataSource(movies.movies);
    // });
    this.moviesSevice.getStoredMovies().subscribe((movies) => {
      this.dataSource = new MatTableDataSource(movies);
    });
  }
  ngOnInit(): void {
    // this.moviesSevice.getMovies({}).subscribe((movies) => {
    //   this.dataSource = movies.movies;
    // });
  }

  addMovie(): void {
    this.moviesSevice.addMovie({});
  }

  openDialog(movie: MovieDTO): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: movie,
    });
    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log('The dialog was closed');
    //   console.log(result);
    //   if (result?.delete) {
    //     this.dataSource.data = this.dataSource.data.filter(
    //       (movie) => movie.id !== result.data.id
    //     );
    //   }
    // });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
      if (result?.delete) {
        this.moviesSevice.deleteMovie(result.data.id);
      }
    });
  }
}
