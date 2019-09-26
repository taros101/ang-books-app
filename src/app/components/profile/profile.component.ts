import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login-service';
import UsersService  from '../../services/users-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  email: string = '';
  avatar: string = '';
  constructor(
    private loginService: LoginService,
    private usersService: UsersService,
    private snackBar: MatSnackBar,
  ) {
    this.usersService.email$.subscribe(
      email => {this.email = email}
    );

    this.usersService.avatar$.subscribe(
      avatar => {this.avatar = avatar}
    );

    const localStore = JSON.parse(localStorage.getItem('auth'));
    if (localStore) {
      this.email = localStore.email
      this.avatar = localStore.img
    }
   }

   toBase64 = (file: any) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  async uploadAvatar() {
    let path: any = document.querySelector("#profile-avatar-change") as HTMLElement;

    if (path.value !== "") {
      let newAvatar: any;
      let file = path.files[0];

      await this.toBase64(file).then((json) => newAvatar = json);
        const data = {
          newAvatar
        }

      const localStore = JSON.parse(localStorage.getItem('token'));
      const userId = localStore.id


      this.usersService.changeAvatar(userId, data).subscribe(
        response => {
          this.snackBar.open(response.message, 'close', {
            duration: 2000,
          })
        })

      this.usersService.getAvatar(newAvatar)

      const authLocalStore = JSON.parse(localStorage.getItem('auth'));
      const authData = {
        "email": authLocalStore.email,
        "id": authLocalStore.id,
        "img": newAvatar,
        "role":authLocalStore.role
      }

      localStorage.setItem('auth', JSON.stringify(authData))
    }
  }

  ngOnInit() {
  }

}
