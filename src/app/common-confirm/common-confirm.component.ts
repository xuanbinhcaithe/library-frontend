import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {error} from 'util';

@Component({
  selector: 'app-common-confirm',
  templateUrl: './common-confirm.component.html',
  styleUrls: ['./common-confirm.component.css']
})
export class CommonConfirmComponent implements OnInit {
  service: any;
  id: number;
  isDeleteFail: any;
  message = 'Xoá không thành công!';

  constructor(private dialogRef: MatDialogRef<CommonConfirmComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any) {
    this.service = data.service;
    this.id = data.id;
  }

  ngOnInit() {
  }

  closeModal() {
    this.dialogRef.close();
  }

  remove() {
    this.service.delete(this.id).subscribe(data => {
      this.dialogRef.close();
    }, error => {
      console.log(error.error);
      this.isDeleteFail = true;
    });
  }
}
