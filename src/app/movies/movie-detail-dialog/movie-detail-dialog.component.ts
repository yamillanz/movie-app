import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MovieDTO } from '../models/movies';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-movie-detail-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  templateUrl: './movie-detail-dialog.component.html',
  styleUrl: './movie-detail-dialog.component.scss',
})
export class MovieDetailDialogComponent {
  private fb = inject(FormBuilder);
  movie: MovieDTO = {} as MovieDTO;
  editing = false;

  movieForm = this.fb.group({
    id: [this.movie.id, Validators.required],
    titleText: [this.movie.titleText, Validators.required],
    primaryImage: [this.movie.primaryImage, Validators.required],
    releaseYear: [this.movie.releaseYear, Validators.required],
    titleType: this.movie.titleType,
  });

  constructor(
    public dialogRef: MatDialogRef<MovieDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MovieDTO
  ) {
    console.log('🚀 ~ MovieDetailDialogComponent ~ data:', data);
    if (data.id) {
      this.movie = data;
      this.editing = true;
    }
  }

  sendData() {
    this.dialogRef.close({ data: this.movie });
  }

  onSubmit(e: Event) {
    e.preventDefault();
    return false;
  }
}
