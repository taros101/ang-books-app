import { Component, OnInit } from '@angular/core';
import BooksService from '../../services/books.service';

@Component({
  selector: 'app-lazy-loading',
  templateUrl: './lazy-loading.component.html',
  styleUrls: ['./lazy-loading.component.scss']
})
export class LazyLoadingComponent implements OnInit {
  books = [];
  
  constructor(
    private booksService: BooksService
  ) { 
    this.booksService.getAllBooks().subscribe(
      books => { 
        this.books = books
      }
    );
  }


  ngOnInit() { }
}
