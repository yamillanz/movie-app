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
import { ActivatedRoute } from '@angular/router';

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
  addressForm = this.fb.group({
    id: [null, Validators.required],
    nombre: [null, Validators.required],
    imagen: null,
    year: [null, Validators.required],
    type: [null, Validators.required],
    // address2: null,
    // city: [null, Validators.required],
    // state: [null, Validators.required],
    // postalCode: [null, Validators.compose([
    //   Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    // ],
    // shipping: ['free', Validators.required]
  });

  @Input() movie: MovieDTO = {} as MovieDTO;
  @Output() movieChange = new EventEmitter<MovieDTO>();
  
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      console.log(params);
      this.movie.id = params.id ?? null;
    });
  }

  // hasUnitNumber = false

  onSubmit(): void {
    alert('Thanks!');
  }
}
