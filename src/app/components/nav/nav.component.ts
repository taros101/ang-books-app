import { Component, OnInit, Input } from '@angular/core';
import AuthService from '../../services/auth-service';
import { Subscription } from 'rxjs';
import { LoginService } from '../../services/login-service';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart-service';
import { Book } from '../../shared/models/book-model';
import  UsersService  from '../../services/users-service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  auth: boolean = false;
  email: string = '';
  avatar: string = '';
  role: string = '';
  cartArr: Book[] = [];
  totalCount: number = 0;
  constructor(
    private authService: AuthService,
    private loginService: LoginService,
    private router: Router,
    private cartService: CartService,
    private userService: UsersService,
  ) {
    this.loginService.auth$.subscribe(
      authData => {this.auth = authData}
    );

    this.userService.email$.subscribe(
      email => {this.email = email}
    );

    this.userService.avatar$.subscribe(
      avatar => {this.avatar = avatar}
    );

    this.userService.role$.subscribe(
      role => {this.role = role}
    );
    this.cartService.cart$.subscribe(
      cart => {
        this.totalCount = 0
        this.cartArr = cart
        this.totalCartCount(cart)
      }
    );

    const localStoreAuth = JSON.parse(localStorage.getItem('auth'));
    if (localStoreAuth) {
      this.auth = true
      this.email = localStoreAuth.email
      this.avatar = localStoreAuth.img
      this.role = localStoreAuth.role
    }

    const localStoreBooks = JSON.parse(localStorage.getItem('books'));
    if (localStoreBooks) {
      const booksArr = localStoreBooks
      this.totalCartCount(booksArr)
      this.cartArr = booksArr
    }
   }

   totalCartCount(booksArr: Book[]) {
      booksArr.forEach((book: any) => {
        this.totalCount += book.quantity * book.price
      });
   }

   logout() {
    localStorage.removeItem('auth');
    localStorage.removeItem('token');

    this.auth = false
    this.email = ''
    this.avatar = ''

    this.router.navigateByUrl("/");
  }

  addBookToCart($event, book: Book) {
    $event.stopPropagation();
    this.cartService.addBookToCart(book)
  }

  removeBookFromCart($event, book: Book) {
    $event.stopPropagation();
    this.cartService.removeBookFromCart(book)
  }


  ngOnInit() { }

}
