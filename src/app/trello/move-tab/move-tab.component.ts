import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {TabService} from '../service/tab.service';
import {BoardServiceService} from '../service/board-service.service';
import {TokenStorageService} from '../../authService/token-storage.service';

@Component({
  selector: 'app-move-tab',
  templateUrl: './move-tab.component.html',
  styleUrls: ['./move-tab.component.css']
})
export class MoveTabComponent implements OnInit {
  isMoveFail = false;
  tabId: any;
  boardId: any;
  listBoard: any[];
  boardMove: any;

  constructor(private dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private tabService: TabService,
              private boardService: BoardServiceService,
              private tokenStorage: TokenStorageService) {
    this.tabId = data.tabId;
    this.boardId = data.boardId;
  }

  ngOnInit() {
    this.boardService.findByUserId(this.tokenStorage.getUser().id).subscribe(data => {
      const res = data;
      if (data != null && data.length > 0) {
        this.listBoard = res.filter(x => x.id !== this.boardId);
      }
      console.log(this.listBoard);
    }, error => {
      console.log(error.error);
    });
  }

  closeModal() {
    this.dialogRef.close();
  }

  move() {
    this.tabService.moveTabToBoard(this.tabId, this.boardMove).subscribe(data => {
      // console.log(data);
      this.dialogRef.close();
    });
  }
}
