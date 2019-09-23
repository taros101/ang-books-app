import { Injectable } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import  AuthService  from './auth.service';

@Injectable()
export default class BooksService {
    providedIn: 'root'
    hostUrl = environment.url;
    constructor(
        private http: HttpClient,
        private authService: AuthService,
        ) { }

    getAllBooks(): Observable<any> {
        return this.http.get<any>(`${this.hostUrl}books`)
    }

    addBook(book: any): Observable<any> {
        let header = this.authService.getHeader()
        return this.http.post<any>(`${this.hostUrl}books/addBook`, book, header)
    }

    searchBook(title: string): Observable<any> {
        return this.http.get<any>(`${this.hostUrl}books/` + title)
            .pipe(catchError(err => of(null)));
    }
}
