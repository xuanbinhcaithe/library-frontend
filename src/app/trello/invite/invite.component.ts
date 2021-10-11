import {Component, Inject, OnInit} from '@angular/core';
import {BoardServiceService} from '../service/board-service.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {UserService} from '../../authService/user.service';
import {NotifyService} from '../service/notify.service';
import {TokenStorageService} from '../../authService/token-storage.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {

  users = [];
  board: any;
  key = '';
  inviteFail = false;

  constructor(private boardService: BoardServiceService,
              private matDialogRef: MatDialogRef<InviteComponent>,
              private userService: UserService,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private notifyService: NotifyService,
              private tokenStorage: TokenStorageService
  ) {
    this.board = data.board;
  }

  async ngOnInit() {
  }

  closeModal() {
    this.matDialogRef.close();
  }

  async searchUser() {
    if (this.key != null && this.key.trim() !== '') {
      this.users = await this.userService.getAllUserInvite(this.board.users, this.key).toPromise();
    } else {
      this.users = [];
    }
  }

  async addUser(id: any) {
    this.boardService.addUserToBoard(this.board.id, id).subscribe(data => {
      this.matDialogRef.close();
      const model = {
        actionUserId: this.tokenStorage.getUser().id,
        boardId: this.board.id,
        userId: id
      };
      this.notifyService.notifyAddUserToBoard(model).subscribe(info => {
        console.log(info);
      });
    }, error => {
      this.inviteFail = true;
    });
  }
}
