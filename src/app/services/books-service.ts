import { Injectable } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable()
export default class BooksService {
    providedIn: 'root'
    hostUrl = environment.url;
    constructor(
        private http: HttpClient,
        ) { }

    getAllBooks(): Observable<any> {
        return this.http.get<any>(`${this.hostUrl}books`)
    }

    addBook(book: any): Observable<any> {
        return this.http.post<any>(`${this.hostUrl}books/addBook`, book)
    }

    searchBook(title: string): Observable<any> {
        return this.http.get<any>(`${this.hostUrl}books/` + title)
            .pipe(catchError(err => of(null)));
    }
}
