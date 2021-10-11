import {Component, OnInit} from '@angular/core';
import {BoardServiceService} from '../service/board-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {BoardFormComponent} from '../board-form/board-form.component';
import {MatDialog} from '@angular/material';
import {CommonConfirmComponent} from '../../common-confirm/common-confirm.component';

@Component({
  selector: 'app-trello-home',
  templateUrl: './trello-home.component.html',
  styleUrls: ['./trello-home.component.css']
})
export class TrelloHomeComponent implements OnInit {
  userId: any;
  listBoard: any[];
  ADD_NEW = 0;
  UPDATE = 1;

  constructor(private boardService: BoardServiceService,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private router: Router) {
  }

  async ngOnInit() {
    this.userId = this.route.snapshot.params.id;
    await this.loadData();
  }

  async loadData() {
    const res = await this.boardService.findByUserId(this.userId).toPromise();
    if (res.length > 0) {
      this.listBoard = res;
    }
  }

  async showFormAddNewBoard() {
    const dialogRef = this.dialog.open(BoardFormComponent, {
      width: '500px',
      data: {
        type: this.ADD_NEW,
        userId: this.userId,
        name: '',
        description: ''
      },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadData();
    });
  }

  removeBoard(boardId: number) {
    const dialogRef = this.dialog.open(CommonConfirmComponent, {
      width: '400px',
      data: {
        service: this.boardService,
        id: boardId
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadData();
    });
  }

  async showFormUpdateBoard(board: any) {
    const dialogRef = this.dialog.open(BoardFormComponent, {
      width: '500px',
      data: {
        type: this.UPDATE,
        userId: this.userId,
        data: board
      },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadData();
    });
  }

  boardDetail(id: number) {
    this.router.navigate(['trello/board', id]);
  }
}
