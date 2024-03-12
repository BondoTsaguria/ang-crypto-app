import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from 'src/app/shared/interfaces/user-data.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountComponent implements OnInit {
  loggedInUsers: UserData[] = [];

  editingUser: UserData | null = null;
  isEditing = false;
  propertyToEdit = '';
  newProperty: number | string | null = null;
  newConfirmPassword: string | null = null;
  passwordsMatch = true;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Fetch the logged-in user data
    const currentUserId = this.authService.getCurrentUserId();
    if (currentUserId !== null) {
      // Fetch the logged-in user data
      this.userService.getLoggedInUsers().subscribe((users) => {
        this.loggedInUsers = users.filter(
          (user) => user.id?.toString() === currentUserId
        );
        this.cdr.detectChanges();
      });
    }
  }

  deleteUser(user: UserData) {
    const confirmDelete = confirm(
      `Are you sure you want to delete the user with Email ${user.email}?`
    );

    if (confirmDelete) {
      // Remove the user from the UI
      this.loggedInUsers = this.loggedInUsers.filter((u) => u.id !== user.id);

      // Remove the user from the servers
      this.userService.deleteUser(user.id).subscribe();
      this.userService.deleteLoggedInUser(user.id).subscribe();
      this.router.navigateByUrl('/home');
      this.authService.setLoggedIn(false);
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('currentUserId');
      this.cdr.detectChanges();
    }
  }

  goToDeposit() {
    this.router.navigateByUrl('/deposit');
  }

  edit(user: UserData) {
    this.editUser(user);
  }

  editUser(user: UserData) {
    this.editingUser = user;
    this.isEditing = true;
  }

  saveEditProperty(newProperty: number | string | null) {
    if (this.editingUser && this.propertyToEdit && newProperty !== null) {
      const updatedUser = { ...this.editingUser };

      switch (this.propertyToEdit) {
        case 'email':
          updatedUser.email = newProperty.toString();
          break;
        case 'password':
          updatedUser.password = newProperty.toString();
          // Check if Confirm Password is provided and matches Password
          if (
            this.newConfirmPassword !== null &&
            this.newConfirmPassword === newProperty.toString()
          ) {
            updatedUser.confirmPassword = this.newConfirmPassword;
          } else {
            this.passwordsMatch = false;
            return;
          }
          break;
        case 'nickname':
          updatedUser.nickname = newProperty.toString();
          break;
        case 'phonenumber':
          updatedUser.phoneNumber = newProperty.toString();
          break;
      }

      const updatedUserForUsers: Partial<UserData> = {
        id: updatedUser.id,
        email: updatedUser.email,
        password: updatedUser.password,
        confirmPassword: updatedUser.confirmPassword,
        nickname: updatedUser.nickname,
        phoneNumber: updatedUser.phoneNumber,
        agreement: updatedUser.agreement,
      };

      const index = this.loggedInUsers.findIndex(
        (user) => user === this.editingUser
      );
      if (index !== -1) {
        this.loggedInUsers[index] = updatedUser;
        this.userService
          .updateUser(this.editingUser.id, updatedUserForUsers)
          .subscribe((response) => {
            this.loggedInUsers[index] = response;
          });

        this.userService
          .updateLoggedInUser(this.editingUser.id, updatedUser)
          .subscribe((response) => {
            this.loggedInUsers[index] = response;
          });
      }
    }

    // Reset editing-related properties
    this.editingUser = null;
    this.isEditing = false;
    this.propertyToEdit = '';
    this.newProperty = null;
    this.newConfirmPassword = null;
  }
}
