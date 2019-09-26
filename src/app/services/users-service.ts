import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../shared/models/user-model';
import { Response } from '../shared/models/response-model';

@Injectable()
export default class UsersService {
    providedIn: 'root'
    hostUrl = environment.url;
    constructor(
        private http: HttpClient,
        ) { }

    public getAllUsers(): Observable<User[]> {
        return this.http.get<any>(`${this.hostUrl}users`)
    }

    public changeAvatar(userId: string, data: object): Observable<Response> {
        return this.http.put<any>(`${this.hostUrl}users/${userId}`, data)
    }

    public editUser(userId: string, data: object): Observable<Response> {
        return this.http.put<any>(`${this.hostUrl}users/editUser/${userId}`, data)
    }

    public deleteUser(userId: string): Observable<Response> {
        return this.http.delete<any>(`${this.hostUrl}users/deleteUser/${userId}`)
    }
}
