import {Component, Inject, OnInit} from '@angular/core';
import {TabService} from '../service/tab.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-tab-form',
  templateUrl: './tab-form.component.html',
  styleUrls: ['./tab-form.component.css']
})
export class TabFormComponent implements OnInit {
  isSaveFail: any;
  message: any;
  dataTab: any;

  constructor(private tabService: TabService,
              private matDialogRed: MatDialogRef<TabFormComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any) {
    this.dataTab = data;
  }

  form = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  ngOnInit() {
    if (this.dataTab.type === 1) {
      this.form.patchValue({
        name: this.dataTab.tab.name || '',
      });
      this.form.addControl('id', new FormControl(this.dataTab.tab.id));
    }
  }

  closeModal() {
    this.matDialogRed.close();
  }

  saveNewTab() {
    if (this.form.get('name').value === '' || this.form.get('name').value == null) {
      this.isSaveFail = true;
      this.message = 'Tên không được để trống!';
      return;
    }
    this.tabService.saveTab(this.dataTab.idBoard, this.form.value).subscribe(data => {
      this.isSaveFail = false;
      this.matDialogRed.close();
    }, error => {
      this.isSaveFail = true;
      this.message = 'Lưu danh sách thất bại';
      console.log(error.error);
    });
  }
}
