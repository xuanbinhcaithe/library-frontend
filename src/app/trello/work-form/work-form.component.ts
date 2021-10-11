import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {WorkService} from '../service/work.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-work-form',
  templateUrl: './work-form.component.html',
  styleUrls: ['./work-form.component.css']
})
export class WorkFormComponent implements OnInit {

  id: any;
  cardId: any;
  name: any;
  isSaveFail = false;
  message = '';
  form = new FormGroup({
    name: new FormControl('')
  });
  work: any;

  constructor(private dialogRef: MatDialogRef<WorkFormComponent>,
              private workService: WorkService,
              @Inject(MAT_DIALOG_DATA) private data: any) {
    this.cardId = data.cardId;
  }

  ngOnInit() {
    if (this.data.type === 1) {
      this.work = this.data.work;
      if (this.work != null) {
        this.form.patchValue({
          name: this.work.name
        });
        this.form.addControl('id', new FormControl(this.work.id));
      }
    }
  }

  closeModal() {
    this.dialogRef.close();
  }

  saveNewTab() {
    this.form.addControl('cardId', new FormControl(this.cardId));
    if (this.form.get('name').value == null || this.form.get('name').value === '') {
      this.isSaveFail = true;
      this.message = 'Tên không được để trống';
      return;
    }
    this.workService.save(this.form.value).subscribe(data => {
        console.log(data);
        this.dialogRef.close();
      },
      error => {
        console.log(error.error);
      });
  }
}
