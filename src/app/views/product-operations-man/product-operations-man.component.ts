import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductsOperationReportManComponent } from '../products-operation-report-man/products-operation-report-man.component';

@Component({
  selector: 'app-product-operations-man',
  templateUrl: './product-operations-man.component.html',
  styleUrls: ['./product-operations-man.component.css']
})
export class ProductOperationsManComponent implements OnInit, AfterViewInit {
  @ViewChild('operationNameInputBox') operationNameInputBox?: ElementRef;
  @ViewChild('operationsListSelect') operationsListSelect:ElementRef | undefined;
  operationForm: FormGroup;
  status: String | undefined;
  operations_list_select: any;
  opcount: number = 0;
  selectedIndex: any = null;
  piecesnum: number = 0;
  packsnum: number = 0;
  public lightgreyStyles = {
    'background-color': 'lightgrey'
  };

  constructor(public dialogRef: MatDialogRef<ProductOperationsManComponent>, @Inject(MAT_DIALOG_DATA)
                public data: {
                                id: any,
                                user_id: any,
                                login_token_id: any,
                                IP: any,
                                year: any,
                                month: any,
                                day: any,
                                hours: any,
                                minutes:any,
                                date: any,
                                timestampdate: any,
                                product_id: number,
                                product: any,
                                operations_list: any,
                                readonly: boolean,
                              },
                              public reportManDialog: MatDialog
                              ) {



      this.operationForm = new FormGroup({
        "id": new FormControl(null),
        "name": new FormControl(null),
        "quantity": new FormControl(null),
        "quantitypack": new FormControl(null),
        "type": new FormControl(null), // "IN" or "OUT
        "note": new FormControl(null),
        "date": new FormControl(null),

      });
  }
  deleteOperation()
  {

    if (this.selectedIndex!=null)
    {
      if (Number.isInteger(this.selectedIndex) && this.selectedIndex >= 0) {
        if (this.data.operations_list.length>this.selectedIndex)
        {
          if (confirm("Confermi la cancellazione dell'operazione?"))
          {
            this.data.operations_list.splice(this.selectedIndex, 1);
            this.selectedIndex = null;
            document.getElementById("operationformdiv")!.style!.display = "none";
          }
        }
      }

    }


  }

  countOperationsListSelectOptions()
  {
    if (this.operationsListSelect!=undefined)
    {
      let ops = this.operationsListSelect!.nativeElement!.options;
      if (ops!=undefined && ops!=null)
      {
        return ops.length;
      }
      else
      {
        return 0;
      }

    }
    else
    {
      return 0;
    }
  }

  getProductId()
  {

    if (this.data.product_id!=undefined && this.data.product_id!=null)
    {
      return this.data.product_id;
    }
    else
    {
      return 0;
    }
  }

  productQuantity()
  {
    let tot = this.data.product.total;

    return tot;
  }

  editOperationByOp(ind: any)
  {

    if (ind!=undefined && ind!=null)
    {
      //alert(JSON.stringify(op))
      document.getElementById("operationformdiv")!.style!.display = "block";
      let op = this.data.operations_list[ind];
      this.selectedIndex = ind;
      this.status = "EDIT";
      this.operationForm.controls['id'].setValue(op.id);
      this.operationForm.controls['name'].setValue(op.name);
      this.operationForm.controls['quantity'].setValue(Math.abs(op.quantity));
      this.operationForm.controls['quantitypack'].setValue(Math.ceil(Math.abs(op.quantity)/this.data.product.pieces_per_pack));
      if (op.month<10 && op.month.length<2)
      {
        op.month = "0"+op.month;
      }
      if (op.day<10 && op.day.length<2)
      {
        op.day = "0"+op.day;
      }
      alert(op.year+"-"+op.month+"-"+op.day)
      this.operationForm.controls["date"].setValue(op.year+"-"+op.month+"-"+op.day);

      if (op.quantity>=0)
        {
          this.operationForm.controls['type'].setValue("IN");
        }
      else
      {
        this.operationForm.controls['type'].setValue("OUT");
      }
      this.operationForm.controls['note'].setValue(op.note);
    }

  }

  closeDialog()
  {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.selectedIndex = null;

  }
  resetOperatioForm()
  {
    this.operationForm.reset();
  }
  cancelOperation()
  {
    this.operationForm.reset();
    this.status=='BROWSE';
    document.getElementById("operationformdiv")!.style!.display = "none";
  }


  saveOperation()
  {
    if (((this.productQuantity() - this.operationForm.value.quantity >= 0) && this.operationForm.value.type=="OUT") || this.operationForm.value.type=="IN")
    {
        if (this.operationForm.value.type==null)
        {
          alert("Selezionare il tipo di operazione");
          return;
        }
        // this.data.date is a string in the format "yyyy-mm-dd"
        let dateStr = this.operationForm.controls['date'].value;
        if (dateStr==undefined || dateStr==null || dateStr=="")
        {
          alert("Selezionare la data");
          return;
        }
        let year = Number(dateStr.substring(0,4));
        let month = Number(dateStr.substring(5,7));
        let day = Number(dateStr.substring(8,10));
        let timestampdate = new Date(year, month-1, day, this.data.hours, this.data.minutes, 0, 0);

        if (this.status=="NEW")
        {
          let operation = {
            "id": null,
            "user_id": this.data.user_id,
            "login_token_id": this.data.login_token_id,
            "IP": this.data.IP,
            "year": this.data.year,
            "month": month,
            "day": day,
            "hours": 0,
            "minutes": 0,
            "date": this.operationForm.controls['date'].value,
            "timestampdate": timestampdate,
            "product_id": this.data.product_id,
            "name": this.operationForm.value.name,
            "quantity": this.operationForm.value.quantity,
            "quantitypack": this.operationForm.value.quantitypack,
            "details": "MsOHaaaa",
            "note": this.operationForm.value.note,
          }
          if (this.operationForm.value.type=="IN")
          {
            operation.quantity = Math.abs(operation.quantity);
          }
          else
          {
            operation.quantity = -Math.abs(operation.quantity);

          }
        this.data.operations_list.push(operation);
        document.getElementById("operationformdiv")!.style!.display = "none";
        this.selectedIndex = null;
        }
      }
      else
      {
        alert("Quantità non disponibile");
      }
  }

  newOperationClick()
  {
    this.status = "NEW";
    this.selectedIndex = null;
    this.operationNameInputBox?.nativeElement.focus();
    this.operations_list_select = undefined;
    this.operationForm.reset();
    document.getElementById("operationformdiv")!.style!.display = "block";
    if (this.data.readonly)
    {
      this.operationForm.controls['type'].setValue("OUT");

    }
  }
  ngAfterViewInit() {
    this.operationNameInputBox?.nativeElement.focus();
  }

  chandedPacksNum(chandedPacksNum: any)
  {
    this.operationForm.controls['quantity'].setValue(this.operationForm.controls['quantitypack'].value * this.data.product.pieces_per_pack);
  //  this.piecesnum = (this.packsnum * this.data.product.pieces_per_pack);
  }

  changedPiecesNum(packnumbox: any)
  {
    //this.operationForm.controls['quantity'].setValue(this.piecesnum/ this.data.product.pieces_per_pack);
    this.operationForm.controls['quantitypack'].setValue(Math.ceil(this.operationForm.controls['quantity'].value/this.data.product.pieces_per_pack ));
  }

  openReportMan()
  {
    this.reportManDialog.open(ProductsOperationReportManComponent, {
        width: "auto",
        height: "auto",
        minHeight: 'calc(100vh - 90px)',
        data: {product_id: this.data.product_id},
        disableClose: true
      });

  }
}
