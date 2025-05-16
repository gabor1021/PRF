import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Gdate } from '../shared/model/Gdate';
import { GdateService } from '../shared/services/gdate.service';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { DeleteComponent } from '../shared/components/delete/delete.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { DialogModule } from '@angular/cdk/dialog';
import { UpdateResComponent } from '../shared/components/update-res/update-res.component';

@Component({
  selector: 'app-res-management',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,MatTableModule,MatIconModule,MatSnackBarModule,DialogModule],
  templateUrl: './res-management.component.html',
  styleUrl: './res-management.component.scss'
})

export class ResManagementComponent implements OnInit{
  dates!: Gdate[];
  managementForm!: FormGroup;
  cols = ['date', 'preference','guest','delete','edit'];
  constructor(
    private gdateService: GdateService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private updateDialog: MatDialog,
    private router: Router  
  ) { }
  
  ngOnInit() {
    this.gdateService.getAll().subscribe({
      next: (data) => {
        this.dates = data;
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

  deleteDate(id: string){
    const dialogRef = this.dialog.open(DeleteComponent);
    dialogRef.afterClosed().subscribe({
      next: (data) => {
        if(data){
            this.gdateService.deleteDate(id).subscribe({
            next: (data) => {
              console.log(data);
              this.dates = [...this.dates];
              this.openSnackBar("Successfully deleted a user's reservation.",2000);
            }, error: (err) => {
              console.log(err);
            }
        });
        }
      }
    })
  }

  updateDate(id: string){
      const dialogRef = this.updateDialog.open(UpdateResComponent);
      dialogRef.afterClosed().subscribe({
        next: (data) => {
          if(data){
              console.log(data)
              this.gdateService.updateDate(id,data.date,data.pref).subscribe({
              next: (data) => {
                console.log(data);
                this.dates = [...this.dates];
                this.openSnackBar("Successfully updated a date.",2000);
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
