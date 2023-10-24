import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { LoginGuard } from '../guards/login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('../../features/home/modules/home.module').then(
        (m) => m.HomeModule
      ),
    canActivate: [LoginGuard],
  },
  {
    path: 'sign-up',
    loadChildren: () =>
      import('../../features/sign-up/modules/sign-up.module').then(
        (m) => m.SignUpModule
      ),
    canActivate: [LoginGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('../../features/login/modules/login.module').then(
        (m) => m.LoginModule
      ),
    canActivate: [LoginGuard],
  },
  {
    path: 'account',
    loadChildren: () =>
      import('../../features/account/modules/account.module').then(
        (m) => m.AccountModule
      ),
    canActivate: [AuthGuard],
  },

  {
    path: 'logout',
    loadChildren: () =>
      import('../../features/logout/modules/logout.module').then(
        (mod) => mod.LogoutModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'market',
    loadChildren: () =>
      import('../../features/market/modules/market.module').then(
        (mod) => mod.MarketModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'market/:id',
    loadChildren: () =>
      import('../../features/market/modules/market.module').then(
        (mod) => mod.MarketModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'deposit',
    loadChildren: () =>
      import('../../features/exchange/modules/deposit/deposit.module').then(
        (mod) => mod.DepositModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'wallet',
    loadChildren: () =>
      import('../../features/exchange/modules/wallet/wallet.module').then(
        (mod) => mod.WalletModule
      ),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
