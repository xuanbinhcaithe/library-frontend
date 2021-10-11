import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CardService} from '../service/card.service';
import {TokenStorageService} from '../../authService/token-storage.service';
import {BoardServiceService} from '../service/board-service.service';
import {TabService} from '../service/tab.service';

@Component({
  selector: 'app-move-card',
  templateUrl: './move-card.component.html',
  styleUrls: ['./move-card.component.css']
})
export class MoveCardComponent implements OnInit {
  isMoveFail = false;
  board: any;
  card: any;
  tab: any;
  idTab: any;

  lstBoard = [];
  lstOrder = [];

  boardMove: any;
  tabMove: any;
  orderMove: any;

  constructor(private matDialogRef: MatDialogRef<MoveCardComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private cardService: CardService,
              private tokenStorage: TokenStorageService,
              private boardService: BoardServiceService,
              private tabService: TabService) {
    this.board = data.board;
    this.card = data.card;
    this.tab = data.tab;
    this.idTab = data.idTab.id;
  }

  async ngOnInit() {
    this.lstBoard = await this.boardService.findByUserId(this.tokenStorage.getUser().id).toPromise();
    this.boardMove = this.board.id;
    this.tabMove = this.idTab;
    this.lstOrder = this.tab.find(x => x.id === this.tabMove).cardDTOList;
    this.orderMove = this.card.cardOrder;
  }

  closeModal() {
    this.matDialogRef.close();
  }

  move() {
    this.cardService.moveCard(this.tabMove, this.card.id, this.orderMove).subscribe(data => {
      console.log(data);
      this.matDialogRef.close();
    });
  }

  async onChangeBoard() {
    this.tab = [];
    this.lstOrder = [];
    this.tab = await this.tabService.getTabByBoardId(this.boardMove).toPromise();
    this.tabMove = this.tab[0].id;
    this.onChangTab();


  }

  onChangTab() {
    console.log(this.tabMove);
    console.log(this.tab);
    const a = this.tab.find(x => x.id == this.tabMove);
    if (a.cardDTOList.length > 0) {
      this.lstOrder = a.cardDTOList;
      this.orderMove = this.lstOrder[0].cardOrder;
    } else {
      this.lstOrder = [{cardOrder: 1}];
      this.orderMove = 1;
    }
  }
}
