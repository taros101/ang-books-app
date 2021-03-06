import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import AuthService from '../../../services/auth-service';
import { LoginService } from '../../../services/login-service';
import  UsersService  from '../../../services/users-service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin = new FormGroup({
    email: new FormControl('', [
        Validators.required,
        Validators.email
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });

  constructor(
    private authService: AuthService,
    private loginService: LoginService,
    private userService: UsersService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginService.loginData$.subscribe(
      loginData => {
        this.formLogin.patchValue({
          email: loginData.email,
          password: loginData.password
        })
      }
    );
  }

  login() {
    if(this.formLogin.invalid) {
      return;
    }

    const form = {
      username: this.formLogin.get('email').value,
      password: this.formLogin.get('password').value
    }

    this.authService.post('login', form).subscribe(
      (response: any) => {
        this.authService.get(response.data).subscribe((data: any) => {
          const userData = data.data
          this.userService.getEmail(userData.email)
          this.userService.getAvatar(userData.img)
          this.userService.getRole(userData.role)

          localStorage.setItem('auth', JSON.stringify(userData))
        })

        this.router.navigateByUrl("/");
      },
      (error: any) => {
        return this.snackBar.open(error.error.message, 'close', {
          duration: 2000,
        })
      }
    );
  }

  ngOnInit() { }
}
