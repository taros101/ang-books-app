import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './common-service';
import * as jwt_decode from "jwt-decode";
import { environment } from '../../environments/environment';

@Injectable()
export default class AuthService {
    providedIn: 'root'
    hostUrl = environment.url;
    constructor(
        private http: HttpClient,
        private loginService: LoginService,
        ) { }
    public auth: any = false;

    public isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        if (token) {
            return true
        }
        return false
    }
    
    post(url: string, body: any): Observable<any> {
        return this.http.post<any>(`${this.hostUrl}${url}`, body)
    }

    get(token: any): Observable<any> {
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

    getToken() {
        const localData = JSON.parse(localStorage.getItem('token'));
        if (localData) {
            return localData.token
        }
    }
}
