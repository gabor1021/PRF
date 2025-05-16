import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Gdate } from '../shared/model/Gdate';
import { GdateService } from '../shared/services/gdate.service';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { DeleteComponent } from '../shared/components/delete/delete.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { DialogModule } from '@angular/cdk/dialog';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule,MatTableModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})

export class HistoryComponent implements OnInit{
  dates?: Gdate[];
  cols = ['date', 'preference'];
  constructor(
    private gdateService: GdateService,
    private authService: AuthService,
    private router: Router  
  ) { }
  
  ngOnInit() {
    this.gdateService.getAll().subscribe({
      next: (data) => {
        console.log(data);
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
}
