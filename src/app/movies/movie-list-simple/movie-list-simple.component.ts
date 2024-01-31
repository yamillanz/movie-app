import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
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
import { isEmptyObject } from '../../shared/helpers/utilities';
import { MovieDetailDialogComponent } from '../movie-detail-dialog/movie-detail-dialog.component';

import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalMessageComponent } from '../../shared/global-message/global-message.component';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-movie-list-simple',
  standalone: true,
  templateUrl: './movie-list-simple.component.html',
  styleUrl: './movie-list-simple.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatPaginatorModule],
})
export class MovieListSimpleComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'title', 'image', 'year', 'actions'];
  dataSource!: MatTableDataSource<MovieDTO>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  subscription: Subscription = new Subscription();

  router = inject(Router);
  moviesSevice = inject(MoviesApiService);

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) {}

  addMovie(): void {
    const dialogRef = this.dialog.open(MovieDetailDialogComponent, {
      width: '50rem',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.data && !isEmptyObject(result.data)) {
        console.log(result);
        this.moviesSevice.addMovie(result.data);
        this.openSnackBar();
      }
    });
  }

  ngOnInit(): void {
    this.subscription = this.moviesSevice
      .getStoredMovies()
      .subscribe((movies) => {
        this.dataSource = new MatTableDataSource(movies);
        this.dataSource.paginator = this.paginator;
      });
  }

  // ngAfterViewInit(): void {
  //   this.dataSource.paginator = this.paginator;
  // }

  updateMovie(movie: MovieDTO): void {
    const dialogRef = this.dialog.open(MovieDetailDialogComponent, {
      width: '50rem',
      data: { ...movie },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.data && !isEmptyObject(result.data)) {
        console.log(result);
        this.moviesSevice.updateMovie(result.data);
        this.openSnackBar();
      }
    });
  }

  openSnackBar() {
    this._snackBar.openFromComponent(GlobalMessageComponent, {
      duration: 3000,
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
