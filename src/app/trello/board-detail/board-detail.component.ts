import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TabDirective} from 'ngx-bootstrap/tabs';
import {TabService} from '../service/tab.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material';
import {TabFormComponent} from '../tab-form/tab-form.component';
import {CommonConfirmComponent} from '../../common-confirm/common-confirm.component';
import {CardFormComponent} from '../card-form/card-form.component';
import {CardService} from '../service/card.service';
import {BoardServiceService} from '../service/board-service.service';
import {InviteComponent} from '../invite/invite.component';
import {MoveCardComponent} from '../move-card/move-card.component';
import {MoveTabComponent} from '../move-tab/move-tab.component';
import {CardDetailComponent} from '../card-detail/card-detail.component';

@Component({
  selector: 'app-board-detail',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.css']
})
export class BoardDetailComponent implements OnInit {
  boardId: number;
  tab: any[];
  board: any;
  ADD_NEW_TAB = 0;
  UPDATE_TAB = 1;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private tabService: TabService,
              private matDialog: MatDialog,
              private cardService: CardService,
              private boardService: BoardServiceService) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.boardId = this.route.snapshot.params.id;
    this.boardService.getById(this.boardId).subscribe(data => {
      this.board = data;
    });
    this.tabService.getTabByBoardId(this.boardId).subscribe(data => {
      this.tab = data;
    }, error => {
      console.log(error.error);
      this.tab = [];
    });
  }

  async drop1(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      const listCard = event.previousContainer.data;
      const listCardId = listCard.map(x => x.id);
      const res = await this.cardService.changeOrderInlist(listCardId).toPromise();
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      const idContainer = event.container.id.substring(14);
      const idTabContainer = this.tab[parseInt(idContainer) - 1].id;
      const listIdCard = event.container.data.map(x => x.id);
      const res = await this.cardService.changeOrderInOtherList(idTabContainer, listIdCard).toPromise();
      const idPre = event.previousContainer.id.substring(14);
      const idTabPre = this.tab[parseInt(idPre) - 1].id;
      const lstPreId = event.previousContainer.data.map(x => x.id);
      if (lstPreId !== undefined) {
        const resData = await this.cardService.changeOrderInOtherList(idTabPre, lstPreId).toPromise();
      }
    }
  }

  showFormAddNewTab() {
    const dialogRef = this.matDialog.open(TabFormComponent, {
      width: '400px',
      data: {
        type: this.ADD_NEW_TAB,
        idBoard: this.boardId
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(data => {
      this.loadData();
    });
  }

  showFormUpdateTab(t: any) {
    const dialogRef = this.matDialog.open(TabFormComponent, {
      width: '400px',
      data: {
        type: this.UPDATE_TAB,
        idBoard: this.boardId,
        tab: t
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(data => {
      this.loadData();
    });
  }


  removeTab(tabId: number) {
    const dialogRef = this.matDialog.open(CommonConfirmComponent, {
      width: '400px',
      data: {
        service: this.tabService,
        id: tabId
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadData();
    });
  }

  addNewCard(id: any) {
    const dialogRef = this.matDialog.open(CardFormComponent, {
      width: '400px',
      data: {
        tabId: id,
      },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(data => {
      this.loadData();
    });
  }

  invite() {
    const res = this.matDialog.open(InviteComponent, {
      width: '500px',
      // height: '500px',
      data: {
        board: this.board
      },
      autoFocus: false
    });

    res.afterClosed().subscribe(data => {
      this.loadData();
    });
  }

  removeCard(cardId: number) {
    const dialogRef = this.matDialog.open(CommonConfirmComponent, {
      width: '400px',
      data: {
        service: this.cardService,
        id: cardId
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadData();
    });
  }

  moveCard(cardInfo: any, t: any, tabs: any) {
    const dialogRef = this.matDialog.open(MoveCardComponent, {
      width: '400px',
      data: {
        board: this.board,
        card: cardInfo,
        idTab: t,
        tab: tabs
      },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(data => {
      this.loadData();
    });
  }

  async drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.tab, event.previousIndex, event.currentIndex);
    const listId = this.tab.map(x => x.id);
    const res = await this.tabService.moveTab(listId).toPromise();
  }

  moveTab(id: any) {
    const dialog = this.matDialog.open(MoveTabComponent, {
      width: '500px',
      data: {
        tabId: id,
        boardId: this.board.id
      }
    });
    dialog.afterClosed().subscribe(data => {
      this.loadData();
    });
  }

  detailCard(tId: any, id: number) {
    console.log(this.board);
    const dialogRef = this.matDialog.open(CardDetailComponent, {
      width: '800px',
      data: {
        tabId: tId,
        cardId: id,
        userDTOLst: this.board.userDTOList
      },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(data => {
      this.loadData();
    });
  }

  exportExcel() {
    this.boardService.exportExcel(this.boardId).subscribe(res => {
      const blob = new Blob([res], {type: 'application/application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob);
        return;
      }
      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data;
      link.download = this.board.name + '.xlsx';
      link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));
      setTimeout(() => {
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100);
    });
  }
}
