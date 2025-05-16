import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Rdate } from '../shared/model/Rdate';
import { RdateService } from '../shared/services/rdate.service';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { DeleteComponent } from '../shared/components/delete/delete.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { DialogModule } from '@angular/cdk/dialog';
import { UpdateComponent } from '../shared/components/update/update.component';

@Component({
  selector: 'app-date-management',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,MatTableModule,MatIconModule,MatSnackBarModule,DialogModule],
  templateUrl: './date-management.component.html',
  styleUrl: './date-management.component.scss'
})

export class DateManagementComponent implements OnInit{
  dates!: Rdate[];
  managementForm!: FormGroup;
  cols = ['date', 'guestnum','delete','edit'];
  constructor(
    private formBuilder: FormBuilder,
    private rdateService: RdateService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private updateDialog: MatDialog,
    private router: Router  
  ) { }
  
  ngOnInit() {
    this.managementForm = this.formBuilder.group({
          date: [''],
          guestnum: ['',[Validators.pattern('[0-9]*')]]
    });
    this.rdateService.getAll().subscribe({
      next: (data) => {
        this.dates = data;
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  onSubmit() {
    if (this.managementForm.valid) {
      console.log('Form data: ',this.managementForm.value);
      this.rdateService.addDate(this.managementForm.value).subscribe({
        next: (data) => {
          console.log(data);
        }, error: (err) => {
          console.log(err);
        }
      });
    } else {
      console.log('Form is not valid.');
    }
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

  genDates(){
    for(let hour = 16; hour < 20; hour++){
      const current_date = new Date();
      const year = current_date.getFullYear();
      const month = ("0" + (current_date.getMonth() + 1)).slice(-2);
      const day = ("0" + current_date.getDate()).slice(-2);
      const date = year+'.'+month+'.'+day+'.'+hour.toString();
      console.log(date);
      this.rdateService.genDates(date).subscribe({
          next: (data) => {
            console.log(data);
          }, error: (err) => {
            console.log(err);
          }
        });
    }
  }

  deleteDate(id: string){
    const dialogRef = this.dialog.open(DeleteComponent);
    dialogRef.afterClosed().subscribe({
      next: (data) => {
        if(data){
            this.rdateService.deleteDate(id).subscribe({
            next: (data) => {
              console.log(data);
              this.dates = [...this.dates];
              this.openSnackBar("Successfully deleted a date.",2000);
            }, error: (err) => {
              console.log(err);
            }
        });
        }
      }
    })
  }

  changeGuestnum(id: string){
    const dialogRef = this.updateDialog.open(UpdateComponent);
    dialogRef.afterClosed().subscribe({
      next: (data) => {
        if(data){
            this.rdateService.updateDate(id,data).subscribe({
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
