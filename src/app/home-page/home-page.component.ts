import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../authService/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService,
              private router: Router) { }

  ngOnInit() {
  }

  goToTrello() {
    this.router.navigate(['/trello', this.tokenStorageService.getUser().id]);
  }
}
