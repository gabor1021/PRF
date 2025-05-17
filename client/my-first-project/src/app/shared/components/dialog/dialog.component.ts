import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { PrefService } from '../../services/pref.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Pref } from '../../model/Pref';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatDialogModule,MatButtonModule,MatFormFieldModule,MatSelectModule,CommonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  selectedPref!: '';
  prefs!: Pref[];
  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    private prefService: PrefService
  ){};

  ngOnInit(){
    this.prefService.getAll().subscribe({
      next: (data) => {
        this.prefs = data;
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  back(){
    this.dialogRef.close();
  }
}
