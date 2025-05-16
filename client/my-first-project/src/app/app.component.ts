import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AComponentComponent } from './a-component/a-component.component';
import { BComponentComponent } from './b-component/b-component.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { DateManagementComponent } from './date-management/date-management.component';
import { ReservationComponent } from './reservation/reservation.component';
import { PrefManagementComponent } from './pref-management/pref-management.component';
import { ResManagementComponent } from './res-management/res-management.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    AComponentComponent,
    BComponentComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    UserManagementComponent,
    DateManagementComponent,
    ReservationComponent,
    PrefManagementComponent,
    ResManagementComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'my-first-project test';
}
