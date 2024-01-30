import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, first, map, tap } from 'rxjs';
import { MovieListItem } from '../models/movies';

@Injectable({
  providedIn: 'root',
})
export class MoviesApiService {
  private URL = 'https://moviesdatabase.p.rapidapi.com/titles';
  constructor(private http: HttpClient) {}

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
      // first(),
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
      })
    ) as Observable<MovieListItem>;
  }
}
