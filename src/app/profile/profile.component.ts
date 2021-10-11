import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TokenStorageService} from '../authService/token-storage.service';
import {UserService} from '../authService/user.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Output() onChangeAvatar = new EventEmitter<any>();
  userInfo: any;
  isUpdateSuccess = false;
  isUpdateFail = false;
  message = '';

  constructor(private tokenStorage: TokenStorageService,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private sniper: NgxSpinnerService) {
  }

  formUser = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl('')
  });
  image: File;
  imageMin: any;


  ngOnInit() {
    this.loadUserInfo();
  }

  async loadUserInfo() {
    // const userId = this.tokenStorage.getUser().id;
    const userId = this.route.snapshot.params.id;
    const response = await this.userService.getUserById(userId).toPromise();
    if (response != null) {
      this.userInfo = response;
    }
    this.formUser.patchValue({
      username: this.userInfo.username,
      email: this.userInfo.email,
      phone: this.userInfo.phone,
      address: this.userInfo.address
    });
    this.imageMin = this.userInfo.avatarUrl;
  }

  changUser() {
    this.userService.updateUserProfile(this.userInfo.id, this.formUser.value).subscribe(data => {
      console.log(data);
      this.isUpdateSuccess = true;
      this.isUpdateFail = false;
      window.location.reload();
    }, error => {
      this.isUpdateFail = true;
      this.isUpdateSuccess = false;
      if (error.error.message === 'Username is in use!') {
        this.message = 'Username đã được sử dụng!';
      } else if (error.error.message === 'Email is in use!') {
        this.message = 'Email đã được sử dụng!';
      } else {
        this.message = 'Lỗi cập nhật thông tin!';
      }
    });
  }

  onUpload() {
    this.sniper.show();
    this.userService.uploadAvatar(this.userInfo.id, this.image).subscribe(data => {
      console.log(data);
      this.sniper.hide();
      window.location.reload();
    }, error => {
      console.log(error.error);
      this.sniper.hide();
    });
  }

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.image = (target.files as FileList)[0];
    const fr = new FileReader();
    fr.onload = (ev: any) => {
      this.imageMin = ev.target.result;
    };
    fr.readAsDataURL(this.image);
  }
}
