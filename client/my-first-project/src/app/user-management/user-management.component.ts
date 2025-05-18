import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../shared/model/User';
import { UserService } from '../shared/services/user.service';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { DeleteComponent } from '../shared/components/delete/delete.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { DialogModule } from '@angular/cdk/dialog';
import { NavbarAdminComponent } from "../shared/components/navbar-admin/navbar-admin.component";

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTableModule, MatIconModule, MatSnackBarModule, DialogModule, NavbarAdminComponent],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})

export class UserManagementComponent implements OnInit{
  users!: User[];
  managementForm!: FormGroup;
  cols = ['email', 'name','phone', 'delete'];
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router  
  ) { }
  
  ngOnInit() {
    this.managementForm = this.formBuilder.group({
      id: ['']
    }),
    this.userService.getAll().subscribe({
      next: (data) => {
        this.users = data;
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  deleteUser(id: string){
    const dialogRef = this.dialog.open(DeleteComponent);
    dialogRef.afterClosed().subscribe({
      next: (data) => {
        if(data){
            this.userService.delete(id).subscribe({
            next: (data) => {
              console.log(data);
              this.users = [...this.users];
              this.openSnackBar("Successfully deleted a user.",2000);
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
