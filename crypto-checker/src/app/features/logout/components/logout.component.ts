import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from 'src/app/shared/interfaces/user-data.interface';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoutComponent {
  loggedInUser: UserData | null = null;
  constructor(
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.authService.setLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUserId');
    this.router.navigateByUrl('/home');
    this.cdr.detectChanges();
  }
}
