import { Injectable, Optional } from '@angular/core';
import { Subject } from 'rxjs';

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
    private cartSource = new Subject<Book[]>();
    
    cart$ = this.cartSource.asObservable();

    public addBookToCart(addBook: Book) {
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

    public removeBookFromCart(removeBook: Book) {
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