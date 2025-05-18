import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [MatDialogModule,MatButtonModule,MatInputModule, FormsModule, CommonModule, MatDatepickerModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss',
})
export class UpdateComponent {
  selectedVal!: 0;
  constructor(private dialogRef: MatDialogRef<UpdateComponent>){}
  back(){
    this.dialogRef.close();
  }
}
