import { Component, OnInit } from '@angular/core';
import { UserData } from 'src/app/shared/interfaces/user-data.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  loggedInUser: UserData | null = null;
  registeredUsers: UserData[] = [];

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Fetch the logged-in user data using the ID from AuthService
    const currentUserId = this.authService.getCurrentUserId();
    if (currentUserId !== null) {
      this.userService.getLoggedInUser().subscribe((users) => {
        this.loggedInUser =
          users.find((user) => user.id === currentUserId) || null;
      });
    }

    // Fetch the list of registered users
    this.userService.getRegisteredUsers().subscribe((users) => {
      this.registeredUsers = users;
    });
  }
}
