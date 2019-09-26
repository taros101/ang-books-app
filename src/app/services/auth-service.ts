import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login-service';
import * as jwt_decode from "jwt-decode";
import { environment } from '../../environments/environment';
import { Response } from '../shared/models/response-model';

@Injectable()
export default class AuthService {
    providedIn: 'root'
    hostUrl = environment.url;
    constructor(
        private http: HttpClient,
        private loginService: LoginService,
        ) { }
    public auth: boolean = false;

    public isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        if (token) {
            return true
        }
        return false
    }
    
    public post(url: string, body: object): Observable<Response> {
        return this.http.post<any>(`${this.hostUrl}${url}`, body)
    }

    public get(token: string): Observable<Response> {
        const decoded = jwt_decode(token) as any;
        const id = decoded.id

        let headers =  {headers: new  HttpHeaders({ 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        })};

        this.auth =true
        this.loginService.getAuth(this.auth)

        localStorage.setItem('token', JSON.stringify({
            "token": token,
            "id": decoded.id,
        }))

        return this.http.get<any>(`${this.hostUrl}users/${id}`, headers)
    }

    public getToken() {
        const localData = JSON.parse(localStorage.getItem('token'));
        if (localData) {
            return localData.token
        }
    }
}
