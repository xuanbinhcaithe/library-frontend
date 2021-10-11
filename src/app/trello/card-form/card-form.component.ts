import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {TokenStorageService} from '../../authService/token-storage.service';
import {CardService} from '../service/card.service';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css']
})

export class CardFormComponent implements OnInit {
  isSaveFail: any;
  message: any;
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
  });

  constructor(private dialogRef: MatDialogRef<CardFormComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private tokenStorage: TokenStorageService,
              private cardService: CardService) {
    this.form.addControl('tabId', new FormControl(data.tabId));
    this.form.addControl('createdBy', new FormControl(this.tokenStorage.getUser().id));
  }

  ngOnInit() {
  }

  saveNewTab() {
    this.cardService.saveCard(this.form.value).subscribe(data => {
      console.log(data);
      this.dialogRef.close();
    }, error => {
      console.log(error.error);
    });
  }

  closeModal() {
    this.dialogRef.close();
  }
}
