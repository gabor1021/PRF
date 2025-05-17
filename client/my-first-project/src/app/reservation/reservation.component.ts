import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Rdate } from '../shared/model/Rdate';
import { RdateService } from '../shared/services/rdate.service';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { DialogComponent } from '../shared/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Pref } from '../shared/model/Pref';
import { PrefService } from '../shared/services/pref.service';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,MatTableModule,MatIconModule,MatButtonModule,MatSnackBarModule],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss'
})

export class ReservationComponent implements OnInit{
  dates!: Rdate[];
  prefs!: Pref[];
  managementForm!: FormGroup;
  cols = ['date', 'guestnum', 'reserve'];
  constructor(
    private rdateService: RdateService,
    private authService: AuthService,
    private prefService: PrefService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router  
  ) { }
    

  ngOnInit() {
    this.rdateService.getAll().subscribe({
      next: (data) => {
        this.dates = data;
      }, error: (err) => {
        console.log(err);
      }
    });
    this.prefService.getAll().subscribe({
      next: (data) => {
        this.prefs = data;
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  logout() {
    this.authService.logout().subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigateByUrl('/login');
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  newRes(id: string){
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe({
      next: (data) => {
        if(data){
          console.log(data)
          this.rdateService.reserveTable(id,data).subscribe({
          next: (data) => {
            console.log(data);
            this.dates = [...this.dates];
            this.openSnackBar("Successfully reserved a table.",2000);
          }, error: (err) => {
            console.log(err);
          }
        });
        }
      }
    })
  }

  openSnackBar(message: string, duration: number){
    this.snackBar.open(message,undefined,{duration});
  }
}
