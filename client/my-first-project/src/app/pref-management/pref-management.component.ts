import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { DialogModule } from '@angular/cdk/dialog';
import { Pref } from '../shared/model/Pref';
import { PrefService } from '../shared/services/pref.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from '../shared/components/delete/delete.component';

@Component({
  selector: 'app-pref-management',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,MatTableModule,MatIconModule,MatSnackBarModule,DialogModule],
  templateUrl: './pref-management.component.html',
  styleUrl: './pref-management.component.scss'
})

export class PrefManagementComponent implements OnInit{
  prefs!: Pref[];
  managementForm!: FormGroup;
  cols = ['spec_request', 'description','delete'];
  constructor(
    private formBuilder: FormBuilder,
    private prefService: PrefService,
    private authService: AuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router  
  ) { }
  
  ngOnInit() {
    this.managementForm = this.formBuilder.group({
          spec_request: [''],
          description: ['']
    });
    this.prefService.getAll().subscribe({
      next: (data) => {
        this.prefs = data;
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  onSubmit() {
    if (this.managementForm.valid) {
      this.prefService.addPref(this.managementForm.value).subscribe({
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

  deletePref(id: string){
    const dialogRef = this.dialog.open(DeleteComponent);
    dialogRef.afterClosed().subscribe({
      next: (data) => {
        if(data){
            this.prefService.deletePref(id).subscribe({
            next: (data) => {
              console.log(data);
              this.prefs = [...this.prefs];
              this.openSnackBar("Successfully deleted a service.",2000);
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
