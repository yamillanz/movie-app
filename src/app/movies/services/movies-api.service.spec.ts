
import { TestBed } from '@angular/core/testing';
import { MoviesApiService } from './movies-api.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieDTO, MovieListItem } from '../models/movies';
// import { Observable, delay, of } from 'rxjs';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';


describe('MoviesApiService', () => {
  let service: MoviesApiService;
  let httpClientSpy: { get: jasmine.Spy };
  let snackBarSpy: { open: jasmine.Spy };

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      // Provide the service-under-test and its dependencies
      providers: [{ provide: MatSnackBar, useValue: snackBarSpy }],
    });

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(MoviesApiService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  // beforeEach(() => {
  //   httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  //   snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
  //   TestBed.configureTestingModule({
  //     providers: [
  //       MoviesApiService,
  //       { provide: HttpClient, useValue: httpClientSpy },
  //       { provide: MatSnackBar, useValue: snackBarSpy },
  //     ],
  //   });
  //   service = TestBed.inject(MoviesApiService);
  // });

  it('should be created', () => {
    expect(service).toBeTruthy();
    const req = httpTestingController.expectOne(
      'https://moviesdatabase.p.rapidapi.com/titles?page=1'
    );
    req.flush({});
  });

  // it('should get movies', (done: DoneFn) => {
  //   const expectedMovies: MovieListItem = {
  //     page: 1,
  //     next: '',
  //     entries: 1,
  //     movies: [
  //       {
  //         id: '1',
  //         primaryImage: 'image_url',
  //         titleText: 'title',
  //         titleType: 'type',
  //         originalTitleText: 'original_title',
  //         releaseYear: 2020,
  //         // releaseDate: '2020-01-01',
  //       },
  //     ],
  //   };

  //   httpClientSpy.get.and.returnValue(asyncData(expectedMovies));

  //   service.getMovies({ page: 1 }).subscribe((movies) => {
  //     expect(movies).toEqual(expectedMovies, 'expected movies');
  //     done();
  //   }, done.fail);

  //   expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  // });

  // it('should add a movie', () => {
  //   const newMovie: MovieDTO = {
  //     id: '2',
  //     primaryImage: 'image_url',
  //     titleText: 'title',
  //     titleType: 'type',
  //     originalTitleText: 'original_title',
  //     releaseYear: 2020,
  //     // releaseDate: '2020-01-01',
  //   };

  //   service.addMovie(newMovie);

  //   service.getStoredMovies().subscribe((movies) => {
  //     expect(movies).toContain(newMovie, 'movie should be added');
  //   });
  // });

  // it('should update a movie', () => {
  //   const updatedMovie: MovieDTO = {
  //     id: '1',
  //     primaryImage: 'updated_image_url',
  //     titleText: 'updated_title',
  //     titleType: 'updated_type',
  //     originalTitleText: 'updated_original_title',
  //     releaseYear: 2020,
  //     // releaseDate: '2020-01-01',
  //   };

  //   service.updateMovie(updatedMovie);

  //   service.getStoredMovies().subscribe((movies) => {
  //     expect(movies).toContain(updatedMovie, 'movie should be updated');
  //   });
  // });

  // it('should delete a movie', () => {
  //   const movieId = '1';

  //   service.deleteMovie(movieId);

  //   service.getStoredMovies().subscribe((movies) => {
  //     expect(movies).not.toContain(
  //       jasmine.objectContaining({ id: movieId }),
  //       'movie should be deleted'
  //     );
  //   });
  // });
});

// function asyncData<T>(data: T): Observable<T> {
//   return of(data).pipe(delay(0));
// }
