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
    private emailSource = new Subject<string>();
    private avatarSource = new Subject<string>();
    private roleSource = new Subject<string>();
    private loginDataSource = new Subject<LoginRequest>();

    auth$ = this.auth.asObservable();
    email$ = this.emailSource.asObservable();
    avatar$ = this.avatarSource.asObservable();
    role$ = this.roleSource.asObservable();
    loginData$ = this.loginDataSource.asObservable();

    getAuth(authData: boolean) {
        this.auth.next(authData);
    }
    getEmail(email: string) {
        this.emailSource.next(email);
    }
    getAvatar(img: string) {
        this.avatarSource.next(img);
    }
    getRole(role: string) {
        this.roleSource.next(role);
    }
    registerToLogin(loginData: LoginRequest) {
        this.loginDataSource.next(loginData);
    }
}