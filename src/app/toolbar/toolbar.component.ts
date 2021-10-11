import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../authService/token-storage.service';
import {Router} from '@angular/router';
import {UserService} from '../authService/user.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  isShow = false;
  userInfo: any;
  constructor(private tokenStorageService: TokenStorageService,
              private route: Router,
              private userService: UserService) {
  }

  ngOnInit() {
    if (this.tokenStorageService.getToken() != null && this.tokenStorageService.getToken() !== '') {
      this.isShow = true;
    }
    this.userService.getUserById(this.tokenStorageService.getUser().id).subscribe(data => {
      this.userInfo = data;
    });
  }

  singout() {
    this.tokenStorageService.sigout();
    this.route.navigate(['/']);
  }

  goToProfile() {
    const userId = this.tokenStorageService.getUser().id;
    this.route.navigate(['/home/profile', userId]);
  }
}
