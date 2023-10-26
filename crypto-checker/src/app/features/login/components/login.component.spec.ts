import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
    });
    fixture = TestBed.createComponent(LoginComponent);
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
    expect(emailControl?.hasError('required')).toBeTruthy();
  });

  it('should mark password field as invalid if too short', () => {
    const passwordControl = component.formGroup.get('password');
    passwordControl?.setValue('short');
    expect(passwordControl?.hasError('minlength')).toBeTruthy();
  });
});
