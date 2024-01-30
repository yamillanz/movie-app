import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, first, map, tap } from 'rxjs';
import { MovieDTO, MovieListItem } from '../models/movies';

@Injectable({
  providedIn: 'root',
})
export class MoviesApiService {
  private URL = 'https://moviesdatabase.p.rapidapi.com/titles';

  private Movies: BehaviorSubject<MovieDTO[]> = new BehaviorSubject<MovieDTO[]>(
    []
  );

  constructor(private http: HttpClient) {
    this.getMovies({ page: 1 }).subscribe();
  }

  getMovies({ page = 1 }): Observable<MovieListItem> {
    const params = {
      page: page.toString(),
    };
    // params.set('limit', '10');

    const headers = {
      'X-RapidAPI-Key': '3da12935bdmshf13f67201a67acbp1fdcb7jsn981cef6e0a51',
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
      })
    ) as Observable<MovieListItem>;
  }

  getStoredMovies(): Observable<MovieDTO[]> {
    return this.Movies.asObservable();
  }

  addMovie(movie: MovieDTO): void {
    this.Movies.next([...this.Movies.value, movie]);
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
}
