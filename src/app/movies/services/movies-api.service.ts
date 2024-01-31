import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  first,
  map,
  of,
  tap,
} from 'rxjs';
import { MovieDTO, MovieListItem } from '../models/movies';
import { environment } from '../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class MoviesApiService {
  private URL = 'https://moviesdatabase.p.rapidapi.com/titles';

  private Movies: BehaviorSubject<MovieDTO[]> = new BehaviorSubject<MovieDTO[]>(
    []
  );

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {
    this.getMovies({ page: 1 }).subscribe();
  }

  getMovies({ page = 1 }): Observable<MovieListItem> {
    const params = {
      page: page.toString(),
    };

    const headers = {
      'X-RapidAPI-Key': environment.RAPID_API_KEY,
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
    };
    return this.http.get(this.URL, { params, headers }).pipe(
      first(),
      map((res: any) => {
        const { page, next, entries, results } = res;
        const cleanData: MovieListItem = {
          page,
          next,
          entries,
          movies: results.map((movie: any) => {
            const {
              id,
              primaryImage,
              titleType,
              titleText,
              originalTitleText,
              releaseYear,
              releaseDate,
            } = movie;
            return {
              id,
              primaryImage: primaryImage ? primaryImage.url : null,
              titleText: titleText.text,
              titleType: titleType.text,
              originalTitleText: originalTitleText.text,
              releaseYear: releaseYear.year,
              releaseDate,
            };
          }),
        };

        return cleanData;
      }),
      tap((movies) => {
        this.Movies.next(movies.movies);
      }),
      catchError(
        this.handleError<MovieListItem>('getMovies', {
          page: 0,
          next: '',
          entries: 0,
          movies: [],
        })
      )
    ) as Observable<MovieListItem>;
  }

  getStoredMovies(): Observable<MovieDTO[]> {
    return this.Movies.asObservable();
  }

  addMovie(movie: MovieDTO): void {
    try {
      // this.createMovie(movie);
      this.Movies.next([...this.Movies.value, movie]);
      // this.log('Movie added successfully');
    } catch (error) {
      this.handleError('addMovie', error);
    }
  }

  getMovie(id: string): Observable<MovieDTO | undefined> {
    return this.Movies.pipe(
      map((movies) => movies.find((movie) => movie.id === id))
    );
  }

  updateMovie(movie: MovieDTO | undefined): void {
    if (!movie) {
      return;
    }
    const movies = this.Movies.value;
    const index = movies.findIndex((m) => m.id === movie.id);
    movies[index] = movie;
    this.Movies.next(movies);
  }

  deleteMovie(id: string): void {
    const movies = this.Movies.value;
    const index = movies.findIndex((m) => m.id === id);
    movies.splice(index, 1);
    this.Movies.next(movies);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this._snackBar.open(message, 'close', {
      duration: 25000,
    });
  }
}
