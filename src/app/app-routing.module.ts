import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './authService/guard/auth.guard';
import {HomePageComponent} from './home-page/home-page.component';
import {ProfileComponent} from './profile/profile.component';
import {TrelloComponent} from './trello/trello.component';
import {TrelloHomeComponent} from './trello/trello-home/trello-home.component';
import {BoardDetailComponent} from './trello/board-detail/board-detail.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomePageComponent
      },
      {
        path: 'profile/:id',
        component: ProfileComponent
      }
    ]
  },
  {
    path: 'trello',
    component: TrelloComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: ':id',
        component: TrelloHomeComponent
      },
      {
        path: 'board/:id',
        component: BoardDetailComponent
      }
    ]
  },
  {
    path: '*',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
