import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfigService } from 'src/app/services/config/config.service';

import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-make-pdf-of-products-list',
  templateUrl: './make-pdf-of-products-list.component.html',
  styleUrls: ['./make-pdf-of-products-list.component.css']
})
export class MakePdfOfProductsListComponent implements AfterViewInit {

  constructor(public dialogRef: MatDialogRef<MakePdfOfProductsListComponent>, @Inject(MAT_DIALOG_DATA)
  public data: {
                  listID: any,
                }, private sanitizer: DomSanitizer, private productserv: ProductsService,  private config: ConfigService) { }

  @ViewChild('pdfFrame') pdfFrame: ElementRef | undefined;
  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
          let IDLIST = this.data.listID;
          this.productserv.printListOfProductsByIdsOBS(IDLIST).subscribe((response: any) => {
          this.pdfFrame!.nativeElement.src = this.config.outputpdf ;


    });

  }

  closeDialog() {
    this.dialogRef.close();
  }

  

}
