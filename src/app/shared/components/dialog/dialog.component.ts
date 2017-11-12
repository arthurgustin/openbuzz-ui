import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { DialogType } from '../../models/dialog-type';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
  styles: ['dialog.component.scss']
})
export class DialogComponent {

  public type: DialogType;
  public types = DialogType;
  public toDelete = ' ';
  public warningMessage = '';
  public errorMessage = '';

  constructor(public dialogRef: MatDialogRef<DialogComponent>) { }

}
