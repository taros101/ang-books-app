import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material/material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegistrationComponent } from './components/auth/registration/registration.component';
import 'hammerjs';


import { Dialog } from './components/admin/admin.component';

import { TruncatePipe }   from './shared/pipes/limit.pipe';


import AuthService from './services/auth-service';
import BooksService from './services/books-service';
import UsersService from './services/users-service';
import { CustomHttpInterceptorService } from './core/interceptors/interceptor';

import { NavComponent } from './components/nav/nav.component';
import { AdminComponent } from './components/admin/admin.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginService } from './services/login-service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    NavComponent,
    AdminComponent,
    ProfileComponent,
    Dialog,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptorService, multi: true },
    AuthService,
    BooksService,
    UsersService,
    LoginService
  ],
  bootstrap: [AppComponent],
  entryComponents: [Dialog]
})
export class AppModule { }
