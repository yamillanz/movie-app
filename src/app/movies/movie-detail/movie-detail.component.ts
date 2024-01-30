import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';

import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MovieDTO } from '../models/movies';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesApiService } from '../services/movies-api.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
})
export class MovieDetailComponent implements OnInit {
  private fb = inject(FormBuilder);
  @Input() movie: MovieDTO = {} as MovieDTO;
  @Output() movieChange = new EventEmitter<MovieDTO>();
  editing = false;

  movieForm = this.fb.group({
    id: [this.movie.id, Validators.required],
    titleText: [this.movie.titleText, Validators.required],
    primaryImage: [this.movie.primaryImage, Validators.required],
    releaseYear: [this.movie.releaseYear, Validators.required],
    titleType: this.movie.titleType,
  });

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      // console.log(params);
      if (params.id) {
        this.moviesService.getMovie(params.id).subscribe((movie) => {
          // console.log('in', movie);
          this.movie = movie ?? {};
          console.log('movie', this.movie);
          this.movieForm.patchValue(this.movie);
          this.editing = true;
        });
      }
    });
  }

  // hasUnitNumber = false

  onSubmit(e: any): void {
    e.preventDefault();
    const movieData: MovieDTO = {
      id: this.movieForm.value.id || undefined,
      titleText: this.movieForm.value.titleText || undefined,
      primaryImage: this.movieForm.value.primaryImage || undefined,
      releaseYear: this.movieForm.value.releaseYear || undefined,
      titleType: this.movieForm.value.titleType || undefined,
    };
    if (this.editing) {
      this.moviesService.updateMovie(movieData);
    } else {
      this.moviesService.addMovie(movieData);
    }
    alert('Thanks!');
    this.router.navigate(['/movies']);
  }
}
