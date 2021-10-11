import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ElementWorkService} from '../service/element-work.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-element-work',
  templateUrl: './element-work.component.html',
  styleUrls: ['./element-work.component.css']
})
export class ElementWorkComponent implements OnInit {

  id: any;
  workId: any;
  elementWork: any;
  form = new FormGroup({
    name: new FormControl('')
  });
  isSaveFail = false;
  message = '';

  constructor(private matRef: MatDialogRef<ElementWorkComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private elementWorkService: ElementWorkService) {
    this.workId = this.data.workId;
  }

  ngOnInit() {
    if (this.data.elementWork != null) {
      this.elementWork = this.data.elementWork;
      console.log(this.elementWork.name);
      this.form.patchValue({
        name: this.elementWork.name
      });
      this.form.addControl('id', new FormControl(this.elementWork.id));
    }
  }

  closeModal() {
    this.matRef.close();
  }

  saveNewElementWork() {
    this.form.addControl('workId', new FormControl(this.workId));
    if (this.form.get('name').value == null || (this.form.get('name').value === '')) {
      this.isSaveFail = true;
      this.message = 'Tên mục không được để trống!';
      return;
    }
    this.elementWorkService.save(this.form.value).subscribe(data => {
      console.log(data);
      this.matRef.close();
    }, error => {
      console.log(error.error);
    });

  }
}
