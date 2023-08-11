import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfigService } from 'src/app/services/config/config.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-print-operations-list-of-product',
  templateUrl: './print-operations-list-of-product.component.html',
  styleUrls: ['./print-operations-list-of-product.component.css']
})
export class PrintOperationsListOfProductComponent implements AfterViewInit {
  @ViewChild('pdfFrame') pdfFrame: ElementRef | undefined;
  constructor(public dialogRef: MatDialogRef<PrintOperationsListOfProductComponent>, @Inject(MAT_DIALOG_DATA)
  public data: {
                  product_id: any,
                  operationsList: any,
                }, private productserv: ProductsService,  private config: ConfigService) { }

  closeDialog() {
    this.dialogRef.close();
  }

  print()
  {
    this.productserv.print_product_operations_list_of_month_and_year(this.data.product_id, this.data.operationsList).subscribe((response: any) => {
      this.pdfFrame!.nativeElement.src = this.config.printOperationsListOutputpdf ;
    });
  }

  ngAfterViewInit(): void {

    this.print();
  }
}
