import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListSimpleComponent } from './movie-list-simple.component';

describe('MovieListSimpleComponent', () => {
  let component: MovieListSimpleComponent;
  let fixture: ComponentFixture<MovieListSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieListSimpleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieListSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
