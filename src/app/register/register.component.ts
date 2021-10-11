import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {UserService} from '../authService/user.service';
import {RegisterForm} from '../authService/model/register-form';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  message = '';
  isShowMessage = false;
  isRegisterSuccess = false;

  constructor(private userService: UserService,
              private router: Router) {
  }

  registerForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl('')
  });

  ngOnInit() {
  }

  register() {
    if (this.registerForm.get('username').value === '' || this.registerForm.get('password').value === '' ||
      this.registerForm.get('email').value === '' || this.registerForm.get('phone').value === '') {
      this.message = 'Vui lòng điền đầy đủ thông tin!';
      this.isShowMessage = true;
      return null;
    }
    const registerForm = new RegisterForm();
    registerForm.username = this.registerForm.get('username').value;
    registerForm.email = this.registerForm.get('email').value;
    registerForm.phone = this.registerForm.get('phone').value;
    registerForm.password = this.registerForm.get('password').value;
    this.userService.register(registerForm).subscribe(data => {
        this.isShowMessage = false;
        this.isRegisterSuccess = true;
        this.message = 'Đăng ký thành công , tiến hành đăng nhập!';
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      },
      error => {
        console.log(error.error.message);
        this.isShowMessage = true;
        if (error.error.message === 'Username is in use!') {
          this.message = 'Tên đăng nhập đã tồn tại!';
        } else if (error.error.message === 'Email is in use!') {
          this.message = 'Email đã tồn tại!';
        } else {
          this.message = 'Lỗi đăng ký tài khoản!';
        }
      });
  }
}
