import { Injectable, Optional } from '@angular/core';
import { Subject } from 'rxjs';

interface LoginRequest {
    email: string;
    password: string
}

@Injectable({
    providedIn: 'root'
})

export class LoginService {
    private auth = new Subject<boolean>();
    private loginDataSource = new Subject<LoginRequest>();

    auth$ = this.auth.asObservable();
    loginData$ = this.loginDataSource.asObservable();

    getAuth(authData: boolean) {
        this.auth.next(authData);
    }
    registerToLogin(loginData: LoginRequest) {
        this.loginDataSource.next(loginData);
    }
}