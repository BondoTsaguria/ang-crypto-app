import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  loggedInUsers: UserData[] = [];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Fetch the logged-in user data using the ID from AuthService
    const currentUserId = this.authService.getCurrentUserId();
    if (currentUserId !== null) {
      this.userService.getLoggedInUser().subscribe((users) => {
        this.loggedInUser =
          users.find((user) => user.id === currentUserId) || null;
      });

      // Fetch the list of logged in users
      this.userService.getLoggedInUser().subscribe((users) => {
        this.loggedInUsers = users.filter((user) => user.id === currentUserId);
      });
    }
  }

  deleteUser(user: UserData) {
    const confirmDelete = confirm(
      `Are you sure you want to delete the user with ID ${user.email}?`
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
    }
  }
}
