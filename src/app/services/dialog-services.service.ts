import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmOperationDialogComponent } from '../views/confirm-operation-dialog/confirm-operation-dialog.component';
import { AlertOperationDialogComponent } from '../views/alert-operation-dialog/alert-operation-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogServicesService {

  constructor(public dialog: MatDialog,) {

  }

  ConfirmOperationDialog(title: any, text: any, confirmOp: any, cancelOp: any) {
    let dialogData: any = {
      "title": title,
      "text": text,
      "confirmOp": confirmOp,
      "cancelOp": cancelOp
    }
    let dialogComponent: any = ConfirmOperationDialogComponent
    const dialogRef = this.dialog.open(dialogComponent, {
      width: '500px',
      data: dialogData
    });

    return dialogRef;
  }


  alertOperationDialog(title: any, text: any, completeOp: any) {
    let dialogData: any = {
      "title": title,
      "text": text,
      "completeOp": completeOp
    }
    let dialogComponent: any = AlertOperationDialogComponent
    const dialogRef = this.dialog.open(dialogComponent, {
      width: '500px',
      data: dialogData
    });
    
    return dialogRef;
  }
}
