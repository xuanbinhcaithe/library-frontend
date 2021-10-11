import {Component, Inject, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup} from '@angular/forms';
import {BoardServiceService} from '../service/board-service.service';

@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html',
  styleUrls: ['./board-form.component.css']
})
export class BoardFormComponent implements OnInit {

  userId: any;
  message = 'Lưu thất bại!';
  isSaveFail = false;
  type: any;
  data: any;
  constructor(private dialogRef: MatDialogRef<BoardFormComponent>,
              @Inject(MAT_DIALOG_DATA) data: any,
              private boardService: BoardServiceService) {
    this.userId = data.userId;
    this.type = data.type;
    this.data = data.data;
  }

  form = new FormGroup({
    name: new FormControl(''),
    description: new FormControl('')
  });

  ngOnInit() {
    if (this.type === 1) {
      if (this.data != null) {
        this.form.patchValue({
          name: this.data.name,
          description: this.data.description
        });
        this.form.addControl('id', new FormControl(this.data.id));
      }
    }
  }

  closeModal() {
    this.dialogRef.close();
  }

  saveNewBoard() {
    console.log(this.form.value);
    this.boardService.save(this.userId, this.form.value).subscribe(data => {
      this.dialogRef.close();
    }, error => {
      this.isSaveFail = true;
    });
  }

}
