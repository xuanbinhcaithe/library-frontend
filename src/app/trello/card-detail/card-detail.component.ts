import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {CardService} from '../service/card.service';
import {DateAdapter, MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {InviteCardComponent} from '../invite-card/invite-card.component';
import {WorkFormComponent} from '../work-form/work-form.component';
import {WorkService} from '../service/work.service';
import {CommonConfirmComponent} from '../../common-confirm/common-confirm.component';
import {ElementWorkComponent} from '../element-work/element-work.component';
import {ElementWorkService} from '../service/element-work.service';
import {TokenStorageService} from '../../authService/token-storage.service';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.css']
})
export class CardDetailComponent implements OnInit {
  tabId: any;
  id: any;
  card: any;
  userDTOLstOfBoard: any[];
  name = '';
  description = '';
  isChageNameSucc = false;
  messageSaveName = '';
  isChageDecSucc = false;
  messageSaveDec = '';
  endDate: any;
  startDate: any;
  isChageDateSucc = false;
  messageSaveDate = '';
  notifyDay: any;

  ADD_NEW_WORK = 0;
  EDIT_WORK = 1;
  lstWork: any[] = [];

  constructor(private cardService: CardService,
              private dialogRef: MatDialogRef<CardDetailComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private matDialog: MatDialog,
              private dateAdapter: DateAdapter<Date>,
              private workService: WorkService,
              private elementWorkService: ElementWorkService,
              private tokenStorage: TokenStorageService) {
    this.id = data.cardId;
    this.userDTOLstOfBoard = data.userDTOLst;
    this.tabId = data.tabId;
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.cardService.getById(this.id).subscribe(data => {
      this.card = data;
      this.name = data.name;
      if (data.startDate != null) {
        this.startDate = new Date(data.startDate);
      }
      if (data.endDate != null) {
        this.endDate = new Date(data.endDate);
      }
      this.description = data.description;
      this.notifyDay = data.notifyDay;
    }, error => {
      console.log(error.error);
    });

    this.workService.getByCardId(this.id).subscribe(data => {
      console.log('---------------------------------', data);
      this.lstWork = data;
    });

  }

  changeName() {
    console.log(this.name);
    this.cardService.changeName(this.id, this.name).subscribe(data => {
      this.isChageNameSucc = true;
      this.messageSaveName = 'Thay đổi tên thẻ thành công';
      setTimeout(() => {
        this.isChageNameSucc = false;
      }, 2000);
    }, error => {
      console.log(error.error);
    });
  }


  changeDec() {
    this.cardService.changeDes(this.id, this.description).subscribe(data => {
      this.isChageDecSucc = true;
      this.messageSaveDec = 'Thay đổi mô tả thẻ thành công';
      setTimeout(() => {
        this.isChageDecSucc = false;
      }, 2000);
    }, error => {
      console.log(error.error);
    });
  }

  invite() {
    const lstIdUser = this.card.userDTOList.map(x => x.id);
    const listUserInvite = this.userDTOLstOfBoard.filter(x => {
      return lstIdUser.indexOf(x.id) === -1;
    });
    const dialogInviteCard = this.matDialog.open(InviteCardComponent, {
      width: '500px',
      data: {
        lstUser: listUserInvite,
        cardId: this.card.id
      }
    });

    dialogInviteCard.afterClosed().subscribe(data => {
      this.loadData();
    });
  }

  log() {
    console.log(this.endDate);
  }

  saveDate() {
    console.log(this.startDate);
    console.log(this.endDate);
    if (this.startDate != null && this.endDate != null) {
      const difference = (this.endDate - this.startDate) / (86400000 * 7);
      if (difference < 0) {
        this.isChageDateSucc = true;
        this.messageSaveDate = 'Ngày kết thúc phải lớn hơn ngày bắt đầu';
        return;
      }
    }

    this.cardService.changeDate(this.id, this.startDate || '', this.endDate || '', this.notifyDay || 0).subscribe(data => {
      console.log(data);
      this.isChageDateSucc = true;
      this.messageSaveDate = 'Lưu thành công!';
      setTimeout(() => {
        this.isChageDateSucc = false;
      }, 1000);
    }, error => {
      console.log(error.error);
    });
  }


  createWork() {
    const mat = this.matDialog.open(WorkFormComponent, {
      width: '500px',
      data: {
        type: this.ADD_NEW_WORK,
        cardId: this.id
      }
    });

    mat.afterClosed().subscribe(data => {
      this.loadData();
    });
  }

  numberOnly($event: KeyboardEvent): boolean {
    // const charCode = (event.keyCode ) ? event.keyCode  : event.keyCode;
    const charCode = 10;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  removeWork(workId: any) {
    const mat = this.matDialog.open(CommonConfirmComponent, {
      width: '400px',
      data: {
        service: this.workService,
        id: workId
      },
      autoFocus: false
    });
    mat.afterClosed().subscribe(data => {
      this.loadData();
    });
  }


  addNewElementWork(wId: any) {
    const mat = this.matDialog.open(ElementWorkComponent, {
      width: '500px',
      data: {
        workId: wId
      }
    });
    mat.afterClosed().subscribe(data => {
      this.loadData();
    });
  }


  editWork(w: any) {
    const mat = this.matDialog.open(WorkFormComponent, {
      width: '500px',
      data: {
        type: this.EDIT_WORK,
        cardId: this.id,
        work: w
      }
    });

    mat.afterClosed().subscribe(data => {
      this.loadData();
    });
  }

  deleteElementWork(elementWorkId: any) {
    const mat = this.matDialog.open(CommonConfirmComponent, {
      width: '400px',
      data: {
        service: this.elementWorkService,
        id: elementWorkId
      },
      autoFocus: false
    });
    mat.afterClosed().subscribe(data => {
      this.loadData();
    });
  }

  editElementWork(wId: any, e: any) {
    const mat = this.matDialog.open(ElementWorkComponent, {
      width: '500px',
      data: {
        workId: wId,
        elementWork: e
      }
    });
    mat.afterClosed().subscribe(data => {
      this.loadData();
    });
  }

  convertToCard(id: any) {
    this.elementWorkService.convertToCard(this.tabId, this.tokenStorage.getUser().id, id).subscribe(data => {
      console.log(data);
      this.dialogRef.close();
    });
  }

  updateStatus(e: any, $event: Event) {
    this.elementWorkService.save(e).subscribe(data => {
      this.loadData();
    });
  }

  getvalue(w: any) {
    if (w.workDTOList == null || w.workDTOList.length === 0) {
      return 0;
    }
    const count = w.workDTOList.length;
    const lstStatusTrue = w.workDTOList.filter(x => x.status === true);
    return lstStatusTrue.length * (100 / count) ;
  }
}
