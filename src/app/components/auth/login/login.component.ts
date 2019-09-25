import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import AuthService from '../../../services/auth-service';
import { LoginService } from '../../../services/common-service';
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
    if (this.formLogin.get('email').hasError('required')) {
      return this.snackBar.open('Email is required!', 'close', {
        duration: 2000,
      })
    }

    if (this.formLogin.get('email').hasError('email')) {
      return this.snackBar.open('Email is incorrect!', 'close', {
        duration: 2000,
      })
    }

    if (this.formLogin.get('password').hasError('required')) {
      return this.snackBar.open('Password is required!', 'close', {
        duration: 2000,
      })
    }

    const form = {
      username: this.formLogin.get('email').value,
      password: this.formLogin.get('password').value
    }

    this.authService.post('login', form).subscribe(
      (data: any) => {
        this.authService.get(data.data).subscribe((response: any) => {
          const data = response.data
          this.loginService.getEmail(data.email)
          this.loginService.getAvatar(data.img)
          this.loginService.getRole(data.role)

          localStorage.setItem('auth', JSON.stringify(data))
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
