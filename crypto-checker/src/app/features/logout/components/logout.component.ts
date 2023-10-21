import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent {
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.setLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUserId');
    this.router.navigateByUrl('/home');
  }
}
