import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteDialogComponent } from './delete-dialog.component';
import { MovieDTO } from '../models/movies';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('DeleteDialogComponent', () => {
  let component: DeleteDialogComponent;
  let fixture: ComponentFixture<DeleteDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<DeleteDialogComponent>>;
  let dialogData: MovieDTO;

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [DeleteDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: dialogData },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteDialogComponent);
    component = fixture.componentInstance;
    component.data = {
      id: '1',
      primaryImage: '',
      titleText: 'Title',
      releaseYear: 2021,
    } as MovieDTO;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog with delete:true and data when delete is called', () => {
    dialogData = {
      id: '1',
      primaryImage: '',
      titleText: 'Title',
      releaseYear: 2021,
    } as MovieDTO;
    component.delete();
    expect(dialogRefSpy.close).toHaveBeenCalledWith({
      delete: true,
      data: dialogData,
    });
  });
});
