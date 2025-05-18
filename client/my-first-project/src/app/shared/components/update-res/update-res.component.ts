import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Pref } from '../../model/Pref';
import { CommonModule } from '@angular/common';
import { PrefService } from '../../services/pref.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-update-res',
  standalone: true,
  imports: [MatDialogModule,MatButtonModule,MatInputModule, FormsModule,CommonModule,MatSelectModule,MatFormFieldModule],
  templateUrl: './update-res.component.html',
  styleUrl: './update-res.component.scss',
})
export class UpdateResComponent {
  selectedPref!: "";
  selectedDate!: "";
  prefs!: Pref[];
  constructor(
    private dialogRef: MatDialogRef<UpdateResComponent>,
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
