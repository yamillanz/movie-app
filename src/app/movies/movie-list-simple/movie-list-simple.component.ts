import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MoviesApiService } from '../services/movies-api.service';
import { MovieDTO } from '../models/movies';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { Router } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MovieDetailComponent } from '../movie-detail/movie-detail.component';
import { isEmptyObject } from '../../shared/helpers/utilities';
import { MovieDetailDialogComponent } from '../movie-detail-dialog/movie-detail-dialog.component';
@Component({
  selector: 'app-movie-list-simple',
  standalone: true,
  templateUrl: './movie-list-simple.component.html',
  styleUrl: './movie-list-simple.component.scss',
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatPaginatorModule],
})
export class MovieListSimpleComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'image', 'year', 'actions'];
  dataSource!: MatTableDataSource<MovieDTO>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  router = inject(Router);
  moviesSevice = inject(MoviesApiService);

  constructor(public dialog: MatDialog) {}

  addMovie(): void {
    const dialogRef = this.dialog.open(MovieDetailDialogComponent, {
      width: '50rem',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.data && !isEmptyObject(result.data)) {
        console.log(result);
        this.moviesSevice.addMovie(result.data);
      }
    });
  }

  ngOnInit(): void {
    this.moviesSevice.getStoredMovies().subscribe((movies) => {
      this.dataSource = new MatTableDataSource(movies);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  updateMovie(movie: MovieDTO): void {
    const dialogRef = this.dialog.open(MovieDetailDialogComponent, {
      width: '50rem',
      data: { ...movie },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.data && !isEmptyObject(result.data)) {
        console.log(result);
        this.moviesSevice.updateMovie(result.data);
      }
    });
  }

  delete(movie: MovieDTO): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: movie,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.delete) {
        this.moviesSevice.deleteMovie(result.data.id);
      }
    });
  }
}
