import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {HomeComponent} from './home/home.component';
import {CustomMaterialModule} from './core/custom-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {authInterceptorProviders} from './authService/auth.interceptor';
import {AuthGuard} from './authService/guard/auth.guard';
import {HomePageComponent} from './home-page/home-page.component';
import {ProfileComponent} from './profile/profile.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {TrelloComponent} from './trello/trello.component';
import {TrelloHomeComponent} from './trello/trello-home/trello-home.component';
import {BsModalService, ModalModule} from 'ngx-bootstrap/modal';
import {BoardFormComponent} from './trello/board-form/board-form.component';
import {MatDatepickerModule, MatDialogModule, MatNativeDateModule, MatProgressBarModule} from '@angular/material';
import {CommonConfirmComponent} from './common-confirm/common-confirm.component';
import {BoardDetailComponent} from './trello/board-detail/board-detail.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {TabFormComponent} from './trello/tab-form/tab-form.component';
import {CardFormComponent} from './trello/card-form/card-form.component';
import {InviteComponent} from './trello/invite/invite.component';
import {MoveCardComponent} from './trello/move-card/move-card.component';
import {MoveTabComponent} from './trello/move-tab/move-tab.component';
import {CardDetailComponent} from './trello/card-detail/card-detail.component';
import {InviteCardComponent} from './trello/invite-card/invite-card.component';
import {NgxMatDatetimePickerModule} from '@angular-material-components/datetime-picker';
import {WorkFormComponent} from './trello/work-form/work-form.component';
import {ElementWorkComponent} from './trello/element-work/element-work.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ToolbarComponent,
    HomeComponent,
    HomePageComponent,
    ProfileComponent,
    TrelloComponent,
    TrelloHomeComponent,
    BoardFormComponent,
    CommonConfirmComponent,
    BoardDetailComponent,
    TabFormComponent,
    CardFormComponent,
    InviteComponent,
    MoveCardComponent,
    MoveTabComponent,
    CardDetailComponent,
    InviteCardComponent,
    WorkFormComponent,
    ElementWorkComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    CustomMaterialModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ModalModule.forRoot(),
    MatDialogModule,
    DragDropModule,
    FormsModule,
    NgxMatDatetimePickerModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule
  ],
  providers: [AuthGuard, authInterceptorProviders, BsModalService],
  bootstrap: [AppComponent],
  entryComponents: [
    BoardFormComponent,
    CommonConfirmComponent,
    TabFormComponent,
    CardFormComponent,
    InviteComponent,
    MoveCardComponent,
    MoveTabComponent,
    CardDetailComponent,
    InviteCardComponent,
    WorkFormComponent,
    ElementWorkComponent
  ]
})
export class AppModule {
}
