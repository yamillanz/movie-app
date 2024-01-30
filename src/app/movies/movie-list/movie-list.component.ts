import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import {
  MatPaginatorModule,
  MatPaginator,
  PageEvent,
} from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MovieListDataSource } from './movie-list-datasource';
import { MoviesApiService } from '../services/movies-api.service';
import { MovieDTO, MovieListItem } from '../models/movies';
import { Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
  standalone: true,
  // changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule],
  providers: [MoviesApiService],
})
export class MovieListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<MovieDTO>;

  // dataSource = new MovieListDataSource();
  dataSource!: MovieListDataSource;
  moviesData: MovieDTO[] = [];
  // moviesData$: Observable<MovieListItem> = new Observable<MovieListItem>();
  // response: any;

  // moviesSevice = inject(MoviesApiService);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  constructor(private moviesSevice: MoviesApiService) {
    // this.dataSource = new MovieListDataSource();
    this.moviesSevice.getMovies({}).subscribe((movies) => {
      this.dataSource = new MovieListDataSource();
      this.dataSource.data = movies.movies;
      // console.log(movies);
    });
    // console.log('moviesData', this.moviesData);
    // this.getMovies();
  }

  ngAfterViewInit(): void {
    // this.getMovies();
    // this.dataSource = new MovieListDataSource();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.dataSource.connect().subscribe((data) => {
      console.log('data interna', data);
    });
    // this.moviesSevice.getMovies({}).subscribe((movies) => {
    //   this.moviesData = [...movies.movies];
    //   this.changeDetectorRef.detectChanges();
    //   this.dataSource.data = this.moviesData;
    //   // this.changeDetectorRef.markForCheck();
    //   // this.table.dataSource = this.dataSource;
    //   // console.log(movies);
    // });
    // console.log('DataSource', this.dataSource.data);
    // console.log('moviesData', this.moviesData);
    // this.changeDetectorRef.detectChanges();
  }

  getMovies() {
    this.moviesSevice.getMovies({}).subscribe((movies: any) => {
      this.moviesData = movies.movies;
      console.log('moviesData IN', this.moviesData);
      // this.dataSource = new MovieListDataSource();
      this.dataSource.data = this.moviesData;
      // this.dataSource.sort = this.sort;
      // this.dataSource.paginator = this.paginator;
    });
    // this.moviesSevice.getMovies({}).subscribe({
    //   next: (movies: any) => {
    //     // this.response = movies;
    //     this.moviesData = movies.movies;
    //     console.log('moviesData IN', this.moviesData);
    //     this.dataSource = new MovieListDataSource();
    //     this.dataSource.data = this.moviesData;
    //     this.dataSource.sort = this.sort;
    //     this.dataSource.paginator = this.paginator;

    //     // this.dataSource.data = this.moviesData;
    //     // this.table.dataSource = this.dataSource;
    //   },
    // });
    // console.log('moviesData$', this.moviesData$);
    // console.log('moviesData', this.moviesData);
    // console.log('response', this.response);
  }

  ngOnInit(): void {
    // this.getMovies();
    // console.log('moviesData', this.moviesData);
    // this.moviesSevice.getMovies({}).subscribe((movies) => {
    //   this.moviesData = [...movies.movies];
    //   this.changeDetectorRef.detectChanges();
    //   this.dataSource.data = [...movies.movies];
    //   // console.log(movies);
    // });
    // this.moviesSevice
    //   .getMovies({})
    //   .pipe(
    //     tap((movies: any) => {
    //       this.moviesData = [...movies.movies];
    //       this.changeDetectorRef.detectChanges();
    //       this.dataSource.data = [...movies.movies];
    //     })
    //   )
    //   .subscribe();
    // // console.log('DataSource', this.dataSource.data);
    // console.log('moviesData', this.moviesData);
  }

  changePage(event: PageEvent) {
    console.log(event);
  }
}
