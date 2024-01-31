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
@Component({
  selector: 'app-movie-list-simple',
  standalone: true,
  templateUrl: './movie-list-simple.component.html',
  styleUrl: './movie-list-simple.component.scss',
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatPaginatorModule],
})
export class MovieListSimpleComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'title', 'image', 'year', 'actions'];
  // dataSource: MovieDTO[] = [];
  dataSource!: MatTableDataSource<MovieDTO>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  router = inject(Router);
  constructor(
    private moviesSevice: MoviesApiService,
    public dialog: MatDialog
  ) {}

  addMovie(): void {
    // this.moviesSevice.addMovie({});
    this.router.navigate(['/movies/new']);
  }

  ngOnInit(): void {
    this.moviesSevice.getStoredMovies().subscribe((movies) => {
      this.dataSource = new MatTableDataSource(movies);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit(): void {
    // this.moviesSevice.getStoredMovies().subscribe((movies) => {
    //   this.dataSource = new MatTableDataSource(movies);
    this.dataSource.paginator = this.paginator;
    // });
  }

  updateMovie(movie: MovieDTO): void {
    this.router.navigate(['/movies', movie.id]);
  }

  openDialog(movie: MovieDTO): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: movie,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
      if (result?.delete) {
        this.moviesSevice.deleteMovie(result.data.id);
      }
    });
  }
}
