import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import AuthService from '../../services/auth.service';
import { AbstractControl } from '@angular/forms';
import { LoginService } from '../../services/common.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private loginService: LoginService,
    private snackBar: MatSnackBar,
  ) {}

  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
    passwordCheck: new FormControl('', [
      Validators.required
    ]),
  },
  this.MatchPassword
  );

  MatchPassword(AC: AbstractControl) {
    let password = AC.get('password').value;
    let confirmPassword = AC.get('passwordCheck').value;
    if (password != confirmPassword) {
      AC.get('passwordCheck').setErrors({ MatchPassword: true })
    } else {
      return null
    }
  }

  registerNewUser() {
    if (this.form.get('email').hasError('required')) {
      return this.snackBar.open('Email is required!', 'close', {
        duration: 2000,
      })
    }

    if (this.form.get('email').hasError('email')) {
      return this.snackBar.open('Email is incorrect!', 'close', {
        duration: 2000,
      })
    }

    if (this.form.get('password').hasError('required')) {
      return this.snackBar.open('Password is required!', 'close', {
        duration: 2000,
      })
    }

    if (this.form.get('passwordCheck').getError('MatchPassword')) {
      return this.snackBar.open('Password does not match!', 'close', {
        duration: 2000,
      })
    }

    const form = {
      email: this.form.get('email').value,
      password: this.form.get('password').value,
      img: '/assets/img/avatar.jpg'
    }
    
    this.authService.post('signup', form).subscribe(

      (data: any) => {
        const loginData = {
          email: form.email,
          password: form.password,
        }
        
        this.router.navigateByUrl("/login").then(x => {
          this.loginService.registerToLogin(loginData);
        });
      },
      (error: any) => {
        return this.snackBar.open(error.error.message, 'close', {
          duration: 2000,
        })
      }

    );
  }
        
  ngOnInit() {
  }
}
