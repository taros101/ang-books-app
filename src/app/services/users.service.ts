import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import  AuthService  from './auth.service';

@Injectable()
export default class UsersService {
    providedIn: 'root'
    hostUrl = environment.url;
    constructor(
        private http: HttpClient,
        private authService: AuthService,
        ) { }

    getAllUsers(): Observable<any> {
        return this.http.get<any>(`${this.hostUrl}users`)
    }

    changeAvatar(userId: any, data: any): Observable<any> {
        return this.http.put<any>(`${this.hostUrl}users/${userId}`, data)
    }

    editUser(userId: string, data: any): Observable<any> {
        let header = this.authService.getHeader()
        return this.http.put<any>(`${this.hostUrl}users/editUser/${userId}`, data, header)
    }

    deleteUser(userId: any): Observable<any> {
        let header = this.authService.getHeader()
        return this.http.delete<any>(`${this.hostUrl}users/deleteUser/${userId}`, header)
    }
}
