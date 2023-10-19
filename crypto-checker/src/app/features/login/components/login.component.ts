import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

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
    private authService: AuthService
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
            this.authService.setLoggedIn(true);
            this.formGroup.reset();
            this.router.navigateByUrl('/account');
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
