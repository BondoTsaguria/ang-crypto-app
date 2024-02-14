import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  formGroup: FormGroup;
  formGroupSubmitted = false;

  constructor(
    private formBlock: FormBuilder,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {
    // Initialize the form group in the constructor
    this.formGroup = this.formBlock.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(/^[a-zA-Z0-9]*$/),
            Validators.minLength(8),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
        nickname: [
          '',
          [Validators.required, Validators.pattern(/^[a-zA-Z0-9-]*$/)],
        ],
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern(/^\+995\d{9}$/)],
        ],

        agreement: [false, Validators.requiredTrue],
      },
      {
        validator: this.passwordMatchValidator,
      }
    );
  }

  // Custom validator function for password matching
  passwordMatchValidator(
    formGroup: FormGroup
  ): null | { passwordMismatch: true } {
    const passwordControl = formGroup.get('password')!;
    const confirmPasswordControl = formGroup.get('confirmPassword')!;

    if (
      passwordControl.value &&
      confirmPasswordControl.value &&
      passwordControl.value !== confirmPasswordControl.value
    ) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      confirmPasswordControl.setErrors(null);
      return null;
    }
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const formData = this.formGroup.value;

      this.userService.addUser(formData).subscribe();

      // Clear the form after submission
      this.formGroup.reset();
      this.cdr.detectChanges();
      // Reset the formGroupSubmitted status to hide error messages
      this.formGroupSubmitted = false;
    } else {
      // If the form is not valid, keep the formGroupSubmitted as true to display error messages
      this.formGroupSubmitted = true;
    }
  }
}
