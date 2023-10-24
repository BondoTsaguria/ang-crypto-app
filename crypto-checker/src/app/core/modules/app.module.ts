import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from '../App/components/app.component';
import { TopBarComponent } from '../top-bar/components/top-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from '../guards/auth.guard';
import { LoginGuard } from '../guards/login.guard';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent, TopBarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,
  ],
  providers: [AuthGuard, LoginGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
