import { Component, Inject } from '@angular/core';
import { EditProductComponent } from '../product-edit/edit-product.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-operation-dialog',
  templateUrl: './alert-operation-dialog.component.html',
  styleUrls: ['./alert-operation-dialog.component.css']
})
export class AlertOperationDialogComponent {
  title: any;
  text: any;
  completeOp: any;
  constructor(public dialogRef: MatDialogRef<EditProductComponent>, @Inject(MAT_DIALOG_DATA) public data: {title: any, text: any, completeOp: any}) {       
    this.title = data.title;
    this.text = data.text;
    this.completeOp = data.completeOp;    
  }

  complete()
    {
      this.completeOp();
      this.dialogRef.close();
    }

}
