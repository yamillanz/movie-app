import { Component } from '@angular/core';
import {
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-global-message',
  standalone: true,
  imports: [MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction],
  templateUrl: './global-message.component.html',
  styleUrl: './global-message.component.scss',
})
export class GlobalMessageComponent {}
