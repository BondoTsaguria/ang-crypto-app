import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ExchangeService } from 'src/app/shared/services/exchange.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private exchangeService: ExchangeService
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

      // Fetch registered users from JSON server
      this.userService.getRegisteredUsers().subscribe(
        (registeredUsers) => {
          const user = registeredUsers.find(
            (user) => user.email === email && user.password === password
          );

          if (user) {
            // Check if the user already exists in loggedInUsers
            this.userService.getLoggedInUser().subscribe(
              (loggedInUsers) => {
                const loggedInUser = loggedInUsers.find(
                  (u) => u.email === email && u.password === password
                );

                if (loggedInUser) {
                  this.authService.setLoggedIn(true);
                  this.formGroup.reset();
                  this.authService.setCurrentUserId(user.id || null);
                  this.router.navigateByUrl('/market');
                } else {
                  // User not already logged in, add to loggedInUsers
                  this.authService.setLoggedIn(true);
                  this.formGroup.reset();
                  this.userService.addLoggedInUser(user).subscribe((res) => {
                    console.log(res);
                  });
                  this.authService.setCurrentUserId(user.id || null);
                  this.router.navigateByUrl('/market');
                }
              },
              (error) => {
                // Handle error when fetching loggedInUsers
                console.error('Error fetching loggedInUsers:', error);
              }
            );
          } else {
            // Invalid email or password
            this.formGroup.get('email')?.setErrors({ invalidEmail: true });
            this.formGroup
              .get('password')
              ?.setErrors({ invalidPassword: true });
          }
        },
        (error) => {
          // Handle error when fetching users
          console.error('Error fetching registered users:', error);
        }
      );
    }
  }
}
