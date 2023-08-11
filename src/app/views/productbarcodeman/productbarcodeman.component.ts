import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-productbarcodeman',
  templateUrl: './productbarcodeman.component.html',
  styleUrls: ['./productbarcodeman.component.css']
})
export class ProductbarcodemanComponent {
  constructor(public dialogRef: MatDialogRef<ProductbarcodemanComponent>,) { }

  closeDialog()
  {
    this.dialogRef.close();
  }

}
