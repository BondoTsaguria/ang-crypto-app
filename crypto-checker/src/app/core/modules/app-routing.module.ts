import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('../../features/home/modules/home.module').then(
        (m) => m.HomeModule
      ),
  },
  {
    path: 'sign-up',
    loadChildren: () =>
      import('../../features/sign-up/modules/sign-up.module').then(
        (m) => m.SignUpModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('../../features/login/modules/login.module').then(
        (m) => m.LoginModule
      ),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('../../features/account/modules/account.module').then(
        (m) => m.AccountModule
      ),
  },

  {
    path: 'logout',
    loadChildren: () =>
      import('../../features/logout/modules/logout.module').then(
        (mod) => mod.LogoutModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
