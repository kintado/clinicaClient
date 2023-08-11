import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-refactor-pieces-per-pack-confirm',
  templateUrl: './refactor-pieces-per-pack-confirm.component.html',
  styleUrls: ['./refactor-pieces-per-pack-confirm.component.css']
})
export class RefactorPiecesPerPackConfirmComponent {

  constructor( public dialogRef: MatDialogRef<RefactorPiecesPerPackConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  packsNumMustBeUnchanged()
  {
    this.dialogRef.close("Packs number must be unchanged!")
  }

  packsNumMustBeChanged()
  {
    this.dialogRef.close("Packs number must be changed!")
  }

  resetPacksNum()
  {
    this.dialogRef.close("Packs number will be reset!")
  }

  cancelSave()
  {
    this.dialogRef.close("Cancel save!")
  }

}
