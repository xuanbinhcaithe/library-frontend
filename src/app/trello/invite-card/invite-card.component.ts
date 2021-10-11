import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CardService} from '../service/card.service';

@Component({
  selector: 'app-invite-card',
  templateUrl: './invite-card.component.html',
  styleUrls: ['./invite-card.component.css']
})
export class InviteCardComponent implements OnInit {
  id: any;
  lstUser: any[];

  constructor(private matDialogRef: MatDialogRef<InviteCardComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private cardService: CardService) {
    this.id = data.cardId;
    this.lstUser = data.lstUser;
  }

  ngOnInit() {
  }

  invite(userId: any) {
    this.cardService.inviteUser(this.id, userId).subscribe(data => {
        this.matDialogRef.close();
      },
      error => {
        console.log(error.error);
      });
  }
}
