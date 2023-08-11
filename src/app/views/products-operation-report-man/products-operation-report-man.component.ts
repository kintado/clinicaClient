import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from 'src/app/services/products.service';
import { PrintOperationsListOfProductComponent } from '../print-operations-list-of-product/print-operations-list-of-product.component';

@Component({
  selector: 'app-products-operation-report-man',
  templateUrl: './products-operation-report-man.component.html',
  styleUrls: ['./products-operation-report-man.component.css']
})
export class ProductsOperationReportManComponent {
  selectedMonth: string | undefined;
  selectedYear: string | undefined;
  months = [
    { value: '1', name: 'January' },
    { value: '2', name: 'February' },
    { value: '3', name: 'March' },
    { value: '4', name: 'April' },
    { value: '5', name: 'May' },
    { value: '6', name: 'June' },
    { value: '7', name: 'July' },
    { value: '8', name: 'August' },
    { value: '9', name: 'September' },
    { value: '10', name: 'October' },
    { value: '11', name: 'November' },
    { value: '12', name: 'December' }
  ];
  years = [
    2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014,
    2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2004, 2003,
    2002, 2001, 2000, 1999, 1998, 1997, 1996, 1994, 1993, 1992
  ];
  operations_list: any;

  constructor(public dialogRef: MatDialogRef<ProductsOperationReportManComponent>, private productservice: ProductsService, @Inject(MAT_DIALOG_DATA)  public data: {
                  product_id: any
                }, public dialog: MatDialog) { }


  onMonthChange() {

  }

  onYearChange()
  {

  }
  onClosePage()
  {
    this.dialogRef.close();
  }

  get_product_operations_list_of_month_and_year()
  {
    if (this.selectedMonth!=undefined && this.selectedYear!=undefined)
    {
        this.productservice.product_operations_list_of_month_and_year(this.data.product_id, this.selectedMonth, this.selectedYear).subscribe((res: any) => {
          if (res!=null && res.length>0)
          {
            this.operations_list = res;
          }
          else
          {
            alert("Non trovo dati di movimenti in questo mese ed anno!");
          }
        });
    }
    else
    {
      if (this.selectedMonth==undefined && this.selectedYear==undefined)
      {
        alert("Selezionare un mese ed un anno");
      }
      else if (this.selectedMonth==undefined)
      {
        alert("Selezionare un mese");
      }
      else
      {
        alert("Selezionare un anno");
      }
    }
  }

  print()
  {
    if (this.operations_list!=null)
    {
      if (this.operations_list.length>0)
      {
        this.dialog.open(PrintOperationsListOfProductComponent, {
          width: "auto",
          height: "auto",
          minHeight: 'calc(100vh - 90px)',
          minWidth: 'calc(100vw - 90px)',
          data: {
                  product_id: this.data.product_id,
                  operationsList: this.operations_list
                },
          disableClose: true
        });

      }
    }
    else
    {
      alert("Non ci sono dati da stampare. Selezionare un mese ed un anno in cui ci sono movimenti e produrre prima qui il report")
    }
  }

}
