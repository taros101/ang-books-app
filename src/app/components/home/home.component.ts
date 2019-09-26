import { Component, OnInit } from '@angular/core';
import BooksService from '../../services/books-service';
import { CartService } from '../../services/cart-service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  books = [];
  searchedBooksArr = [];
  searchValue: boolean = false;
  
  constructor(
    private booksService: BooksService,
    private cartService: CartService,
  ) { 
    this.booksService.getAllBooks().subscribe(
      books => { 
        this.books = books
      }
    );
  }

  bookTitle = new FormControl();

  addBookToCart(book: any) {
    this.cartService.addBookToCart(book)
  }

  searchBook() {
    this.bookTitle.valueChanges.pipe(
      debounceTime(1000),
      switchMap((title) => {
        title === '' 
        ? this.searchValue = false
        : this.searchValue = true
        return this.booksService.searchBook(title);
      })
    ).subscribe(res => {
      res.data === undefined
      ? this.searchedBooksArr = []
      : this.searchedBooksArr = res.data
    });
  }

  ngOnInit() {
    this.searchBook();
  }

}
