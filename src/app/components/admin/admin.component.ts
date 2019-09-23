import { Component, OnInit, Inject, ViewChild, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import BooksService from '../../services/books.service';
import UsersService from '../../services/users.service';
import {MatTableDataSource} from '@angular/material/table';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';

export interface Book {
  _id: number;
  title: string;
  author: string;
  description: string;
  price: number;
}

export interface User {
  _id: number;
  email: string;
}

export interface DialogData {
  dialogType: 'addBook' | 'editUser' | 'deleteUser';
}


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  booksSource: any;
  usersSource: any;

  constructor(
    public dialog: MatDialog,
    private booksService: BooksService,
    private usersService: UsersService,
    private snackBar: MatSnackBar,
    ) { }

  @ViewChild('paginator', {static: true}) paginator: MatPaginator;
  @ViewChild('paginator2', {static: true}) paginator2: MatPaginator;
  DialogRef: MatDialogRef<Dialog>;

  displayedColumns: string[] = ['number', 'title', 'author', 'description', 'price'];
  usersColumns: string[] = ['number', 'email', 'edit-delete'];


  openDialog() {
    const dialogRef = this.dialog.open(Dialog, {
      data: {
        dialogType: 'addBook'
      }
    });

    dialogRef.afterClosed().subscribe(newBook => {
      this.booksService.getAllBooks().subscribe((data: any) => {
        this.booksSource = new MatTableDataSource<Book>(data);
        this.booksSource.paginator = this.paginator2;
      });
    });
  }

  openEditDialog(email: string) {
    const usersBase = this.usersSource.filteredData
    const user = usersBase.find(item => item.email === email)

    const dialogRef = this.dialog.open(Dialog, {
      data: {
        dialogType: 'editUser',
        userEmail: email,
        userId: user._id
      }
    })

    dialogRef.afterClosed().subscribe(response => {
      this.usersService.getAllUsers().subscribe((data: any) => {
        this.usersSource = new MatTableDataSource<User>(data);
        this.usersSource.paginator = this.paginator;
      });
    });
  }

  openDeleteDialog(email: string) {
    const usersBase = this.usersSource.filteredData
    const user = usersBase.find(item => item.email === email)

    const dialogRef = this.dialog.open(Dialog, {
      data: {
        dialogType: 'deleteUser',
        userId: user._id
      }
    })

    dialogRef.afterClosed().subscribe(response => {
      this.usersService.getAllUsers().subscribe((data: any) => {
        this.usersSource = new MatTableDataSource<User>(data);
        this.usersSource.paginator = this.paginator;
      });
    });
  }

  ngOnInit() {
    this.usersService.getAllUsers().subscribe((data: any) => {
      this.usersSource = new MatTableDataSource<User>(data);
      this.usersSource.paginator = this.paginator;
    });

    this.booksService.getAllBooks().subscribe((data: any) => {
      this.booksSource = new MatTableDataSource<Book>(data);
      this.booksSource.paginator = this.paginator2;
    });
  }
}

@Component({
  selector: 'dialog-block',
  templateUrl: './dialog.html',
  styleUrls: ['./admin.component.scss']
})
export class Dialog implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<Dialog>,
    private booksService: BooksService,
    private snackBar: MatSnackBar,
    private usersService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) { }
  DialogRef: MatDialogRef<Dialog>;

  imgURL: any;

  title = new FormControl('', [
    Validators.required
  ]);
  author = new FormControl('', [
    Validators.required
  ]);
  description = new FormControl('', [
    Validators.required
  ]);
  cover = new FormControl('', [
    Validators.required
  ]);
  price = new FormControl('', [
    Validators.required
  ]);
  userEmail = new FormControl('', [
    Validators.required,
    Validators.email
  ])

  async preview() {
    let path: any = document.querySelector("#bookcover-input") as HTMLElement;
    let bookCover: any;
    let file = path.files[0];

    await this.toBase64(file).then((json) => bookCover = json);
  
    this.imgURL = bookCover
  }

  toBase64 = (file: any) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  async addBook() {
    if (this.title.hasError('required')) {
      return this.snackBar.open('Title is required!', 'close', {
        duration: 2000,
      })
    }

    if (this.author.hasError('required')) {
      return this.snackBar.open('Author is required!', 'close', {
        duration: 2000,
      })
    }

    if (this.description.hasError('required')) {
      return this.snackBar.open('Description is required!', 'close', {
        duration: 2000,
      })
    }

    if (this.price.hasError('required')) {
      return this.snackBar.open('Price is required!', 'close', {
        duration: 2000,
      })
    }

    if (this.cover.hasError('required')) {
      return this.snackBar.open('Cover is required!', 'close', {
        duration: 2000,
      })
    }

  let path: any = document.querySelector("#bookcover-input") as HTMLElement;
  let bookCover: any;
  let file = path.files[0];

  await this.toBase64(file).then((json) => bookCover = json);

  const data = {
      title: this.title.value,
      author: this.author.value,
      description: this.description.value,
      cover: bookCover,
      price: this.price.value
  }

  this.booksService.addBook(data).subscribe(
      response => {
        this.dialogRef.close(data);
        this.snackBar.open(`${response.message}`, 'close', {
          duration: 2000
        })
      })
  }

  
  async editUser(newEmail: string, userId: string) {
    const data = {
      newEmail
    }

    this.usersService.editUser(userId, data).subscribe(response => {
      this.dialogRef.close();
      this.snackBar.open(`${response.message}`, 'close', {
        duration: 2000,
      })
    })
  }

  async deleteUser(userId: string) {
    this.usersService.deleteUser(userId).subscribe(response => {
      this.dialogRef.close();
      this.snackBar.open(`${response.message}`, 'close', {
        duration: 2000,
      })
    })
  }

  ngOnInit() {
  }
}
