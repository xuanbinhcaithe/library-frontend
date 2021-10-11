import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../authService/user.service';
import {TokenStorageService} from '../authService/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message = '';
  isShowMessage = false;

  constructor(private router: Router,
              private userService: UserService,
              private tokenStorage: TokenStorageService) {
  }

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  ngOnInit() {
    if (this.tokenStorage.getToken() != null && this.tokenStorage.getToken() !== '') {
      this.router.navigate(['/home']);
    }
  }

  login() {
    if (this.loginForm.get('username').value == null || this.loginForm.get('username').value === '') {
      this.message = 'Tên đăng nhập không được để trống!';
      this.isShowMessage = true;
      return;
    }
    if (this.loginForm.get('password').value == null || this.loginForm.get('password').value === '') {
      this.message = 'Mật khẩu không được để trống!';
      this.isShowMessage = true;
      return;
    }
    this.userService.login(this.loginForm.value).subscribe(data => {
      console.log(data);
      this.tokenStorage.saveToken(data.token);
      this.tokenStorage.saveUserInfo(data.userDTO);
      this.router.navigate(['/home']);
    }, error => {
      this.isShowMessage = true;
      this.message = 'Thông tin đăng nhập không chính xác#!';
    });
  }
}
