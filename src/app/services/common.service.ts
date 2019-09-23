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

export interface Book {
    _id: number;
    title: string;
    author: string;
    description: string;
    cover: string;
    price: number;
    quantity: number;
}

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cartSource = new Subject<any[]>();
    
    cart$ = this.cartSource.asObservable();

    addBookToCart(addBook: Book) {
        let userBooks: Book[] = [];
        const currentBooks: Book[] = JSON.parse(localStorage.getItem('books'));

        if (currentBooks) {
            userBooks = currentBooks
            let newBook: boolean = true

            userBooks.forEach((book: Book) => {
                if (book._id === addBook._id) {
                    newBook = false;
                    book.quantity++
                }
            });

            addBook.quantity = 1
            newBook ? userBooks.push(addBook) : null

            localStorage.removeItem('books');
            localStorage.setItem('books', JSON.stringify(userBooks))

            this.cartSource.next(userBooks);
        } else {
            addBook.quantity = 1
            userBooks.push(addBook)

            localStorage.removeItem('books');
            localStorage.setItem('books', JSON.stringify(userBooks))

            this.cartSource.next(userBooks);
        }
    }

    removeBookFromCart(removeBook: Book) {
        let userBooks: Book[] = [];
        const currentBooks: Book[] = JSON.parse(localStorage.getItem('books'));

        if (currentBooks) {
            userBooks = currentBooks
            let deleteBookId = null

            currentBooks.forEach((book: Book, index) => {
                if (book._id === removeBook._id) {
                    book.quantity--;
                    if (book.quantity === 0) {
                        deleteBookId = index 
                    }
                }
            });

            if (deleteBookId !== null) {
                userBooks.splice(deleteBookId, 1)
            }

            localStorage.removeItem('books');
            if (userBooks.length !== 0) {
                localStorage.setItem('books', JSON.stringify(userBooks))
            }

            this.cartSource.next(userBooks);
        } 
    }
}