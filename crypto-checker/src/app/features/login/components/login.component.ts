import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const email = this.formGroup.value.email;
      const password = this.formGroup.value.password;
      this.cdr.detectChanges();

      // Fetch registered users from JSON server
      this.userService.getRegisteredUsers().subscribe(
        (registeredUsers) => {
          const user = registeredUsers.find(
            (user) => user.email === email && user.password === password
          );
          this.cdr.detectChanges();

          if (user) {
            this.cdr.detectChanges();
            // Check if the user already exists in loggedInUsers
            this.userService.getLoggedInUsers().subscribe(
              (loggedInUsers) => {
                const loggedInUser = loggedInUsers.find(
                  (u) => u.email === email && u.password === password
                );

                if (loggedInUser) {
                  this.authService.setLoggedIn(true);
                  this.formGroup.reset();
                  this.authService.setCurrentUserId(user.id || null);
                  this.router.navigateByUrl('/market');
                  this.cdr.detectChanges();
                } else {
                  // User not already logged in, add to loggedInUsers
                  this.authService.setLoggedIn(true);
                  this.formGroup.reset();
                  this.userService.addLoggedInUser(user).subscribe((res) => {
                    console.log(res);
                  });
                  this.authService.setCurrentUserId(user.id || null);
                  this.router.navigateByUrl('/market');
                  this.cdr.detectChanges();
                }
              },
              (error) => {
                // Handle error when fetching loggedInUsers
                console.error('Error fetching loggedInUsers:', error);
                this.cdr.detectChanges();
              }
            );
          } else {
            // Invalid email or password
            this.formGroup.get('email')?.setErrors({ invalidEmail: true });
            this.formGroup
              .get('password')
              ?.setErrors({ invalidPassword: true });
            this.cdr.detectChanges();
          }
        },
        (error) => {
          // Handle error when fetching users
          console.error('Error fetching registered users:', error);
          this.cdr.detectChanges();
        }
      );
    }
  }
}
