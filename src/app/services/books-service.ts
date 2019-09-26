import { Injectable } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Book } from '../shared/models/book-model';
import { Response } from '../shared/models/response-model';

@Injectable()
export default class BooksService {
    providedIn: 'root'
    hostUrl = environment.url;
    constructor(
        private http: HttpClient,
        ) { }

    public getAllBooks(): Observable<Book[]> {
        return this.http.get<any>(`${this.hostUrl}books`)
    }

    public addBook(book: object): Observable<Response> {
        return this.http.post<any>(`${this.hostUrl}books/addBook`, book)
    }

    public searchBook(title: string): Observable<Book[]> {
        return this.http.get<any>(`${this.hostUrl}books/` + title)
            .pipe(catchError(err => of(null)));
    }
}
