import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map, tap } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { MovieDTO } from '../models/movies';
import { inject } from '@angular/core';
import { MoviesApiService } from '../services/movies-api.service';

// // TODO: Replace this with your own data model type
// export interface MovieDTO {
//   name: string;
//   id: number;
// }


/**
 * Data source for the MovieList view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class MovieListDataSource extends DataSource<MovieDTO> {
  data!: MovieDTO[];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  moviesSevice = inject(MoviesApiService);

  constructor() {
    super();
    // this.moviesSevice.getMovies({}).subscribe((movies) => {
    //   this.data = [...movies.movies];
    //   // console.log(movies);
    //   // console.log('DataSource sub', this.data);
    //   // this.connect().subscribe();
    // });
    // console.log('DataSource In', this.data);
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<MovieDTO[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(
        observableOf(this.data),
        this.paginator.page,
        this.sort.sortChange
      ).pipe(
        map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        })
      );
    } else {
      throw Error(
        'Please set the paginator and sort on the data source before connecting.'
      );
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: MovieDTO[]): MovieDTO[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: MovieDTO[]): MovieDTO[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name':
          return compare(a.titleText ?? '', b.titleText ?? '', isAsc);
        case 'id':
          return compare(+(a.id ?? 0), +(b.id ?? 0), isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(
  a: string | number,
  b: string | number,
  isAsc: boolean
): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
