import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';

// FormsModule, ReactiveFormsModule

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      email: ['',[Validators.email]],
      password: ['', [Validators.minLength(6) || Validators.maxLength(0)]],
      confirmPassword: [''],
      name: [''],
      phone: [''],
    }, {
      validator: this.mustMatch('password', 'confirmPassword')
    });
    this.profileForm.get('password')?.valueChanges.subscribe(value => {
      if (!value) {
        this.profileForm.get('confirmPassword')?.reset('');
      }
    });
}

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      if (!control.value && !matchingControl.value || control.value === matchingControl.value) {
        matchingControl.setErrors(null);
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  onSubmit() {
    if (this.profileForm.valid) {
      console.log('Form data:', this.profileForm.value);
      this.userService.update(this.profileForm.value).subscribe({
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

}
