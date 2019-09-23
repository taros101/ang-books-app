import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AdminComponent } from './components/admin/admin.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './core/guards/auth-guard.service';

const routes: Routes = [
  {  path: "login", component: LoginComponent},
  {  path: "registration", component: RegistrationComponent},
  {  path: "admin", component: AdminComponent, canActivate: [AuthGuard]},
  {  path: "profile", component: ProfileComponent, canActivate: [AuthGuard]},
  {  path: "lazy-load", loadChildren: './lazy.module#LazyModule'},
  {  path: "", component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
