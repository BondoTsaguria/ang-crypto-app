import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form group', () => {
    expect(component.formGroup).toBeTruthy();
  });

  it('should mark email field as invalid if empty', () => {
    const emailControl = component.formGroup.get('email');
    emailControl?.setValue('');
    expect(emailControl?.valid).toBeFalsy();
  });

  it('should mark confirmPassword as invalid if passwords do not match', () => {
    const passwordControl = component.formGroup.get('password');
    const confirmPasswordControl = component.formGroup.get('confirmPassword');

    if (passwordControl && confirmPasswordControl) {
      passwordControl.setValue('password1');
      confirmPasswordControl.setValue('password2');
      expect(component.formGroup.hasError('passwordMismatch')).toBeTruthy();
    } else {
      fail('Controls are null');
    }
  });
});
