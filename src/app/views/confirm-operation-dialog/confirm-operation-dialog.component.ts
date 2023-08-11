import { Component, Inject } from '@angular/core';
import { EditProductComponent } from '../product-edit/edit-product.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-confirm-operation-dialog',
  templateUrl: './confirm-operation-dialog.component.html',
  styleUrls: ['./confirm-operation-dialog.component.css']
})
export class ConfirmOperationDialogComponent {
    title: any;
    text: any;
    confirmOp: any;
    cancelOp: any;
    public dialogOBS: any = null;
    constructor(public dialogRef: MatDialogRef<EditProductComponent>, @Inject(MAT_DIALOG_DATA) public data: {title: any, text: any, confirmOp: any, cancelOp: any},) {       
      this.title = data.title;
      this.text = data.text;
      this.confirmOp = data.confirmOp;
      this.cancelOp = data.cancelOp;
      
    }

    confirm()
    {
      this.confirmOp();
    }

    cancel()
    {
      this.cancelOp();
      this.dialogRef.close();
    }



}
