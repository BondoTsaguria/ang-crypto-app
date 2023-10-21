import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from 'src/app/shared/interfaces/user-data.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent {
  loggedInUser: UserData | null = null;
  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.authService.setLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    const currentUserId = this.authService.getCurrentUserId();
    if (currentUserId !== null) {
      this.userService.getLoggedInUser().subscribe((users) => {
        this.loggedInUser =
          users.find((user) => user.id === currentUserId) || null;

        if (this.loggedInUser) {
          // User with currentUserId found, proceed with deletion
          this.userService.deleteLoggedInUser(currentUserId).subscribe(() => {
            localStorage.removeItem('currentUserId');
            this.router.navigateByUrl('/home');
          });
        } else {
          console.error('User with currentUserId not found.');
        }
      });
    }
  }
}
