// import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GlobalMessageComponent } from "./global-message.component";

describe('GlobalMessageComponent', () => {
  let component: GlobalMessageComponent;
  let fixture: ComponentFixture<GlobalMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have MatSnackBarLabel', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('[matSnackBarLabel]')).toBeTruthy();
  });

  // it('should have MatSnackBarActions', () => {
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('mat-snack-bar-actions')).toBeTruthy();
  // });

  // it('should have MatSnackBarAction', () => {
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('mat-snack-bar-action')).toBeTruthy();
  // });
});