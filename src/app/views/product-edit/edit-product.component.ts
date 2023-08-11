import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ConfigService } from 'src/app/services/config/config.service';
import { ProductsService } from 'src/app/services/products.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { CategoryManagementComponent } from '../category-management/category-management.component';
import { ProductbarcodemanComponent } from '../productbarcodeman/productbarcodeman.component';
import { AuthService } from 'src/app/services/auth.service';
import { CommunicatorService } from 'src/app/services/communications/communicator.service';
import { ProductOperationsManComponent } from '../product-operations-man/product-operations-man.component';
import { Router } from '@angular/router';
import { OpComWaitingService } from 'src/app/services/op-com-waiting.service';
import { RefactorPiecesPerPackConfirmComponent } from 'src/app/dialogs/refactor-pieces-per-pack-confirm/refactor-pieces-per-pack-confirm.component';
import { BarcodesService } from 'src/app/services/barcodes.service';
import * as JsBarcode from 'jsbarcode';
import { BarcodeforprintComponent } from '../barcodeforprint/barcodeforprint.component';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

declare var redrawDataTable: any;
declare var getBarcodeType: any;

@Component({
  selector: 'edit-product-dialog',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit
{
    @ViewChild('controltextarea') controltextarea?: ElementRef;
    @ViewChild('barcode4product') barcode4product?: ElementRef;
    @ViewChild('barcode4pieceofproduct') barcode4pieceofproduct?: ElementRef;

    type_id: number | undefined;
    id: number | undefined;

    productForm: FormGroup;
    categories: any = [];

    aggiunta: boolean | undefined;
    readonly: boolean = false;
    BGColorOfQuanty: string = "white";
    piecebarcodecheck: boolean = false;
    product: any  = {
      "id": null,
        "type_id": null,
        "category_id": null,
        "category_name": null,
        "name": null,
        "packaging_name": null,
        "quantity": null,
        "barcode": null,
        "piecebarcodecheck": null,
        "piece_barcode": null,
        "minimum_packages_stock": null,
        "note": null,
        "operations_list": [],
        "pieces_per_pack": null,
        "ifChangedPiecesPerPackOPTION": null,
        "fornitore": null,
        "total_packs": null

    }
    constructor(public dialogRef: MatDialogRef<EditProductComponent>, @Inject(MAT_DIALOG_DATA) public data: {type_id: number, id: number, readonly: boolean, dialog: any}, private http: HttpClient,  private config: ConfigService, private categoriesS: CategoriesService, private productS: ProductsService, public dialog: MatDialog, public ProductbarcodemanComponentDialog: MatDialog, private authservice:AuthService, private comm: CommunicatorService, private router: Router, private opcom: OpComWaitingService, private barcodeservice: BarcodesService) {
      this.type_id = data.type_id;
      this.id = data.id;
      this.readonly = data.readonly;



      this.productForm = new FormGroup({
        "id": new FormControl(this.id),
        "type_id": new FormControl(this.type_id),
        "category_id": new FormControl(""),
        "category_name": new FormControl(""),
        "name": new FormControl(""),
        "packaging_name": new FormControl(""),
        "quantity": new FormControl(""),
        "barcode": new FormControl(""),
        "piecebarcodecheck": new FormControl(false),
        "piece_barcode": new FormControl(""),
        "minimum_packages_stock": new FormControl(""),
        "note": new FormControl(""),
        "pieces_per_pack": new FormControl(""),
        "ifChangedPiecesPerPackOPTION": new FormControl(""),
        "fornitore": new FormControl(""),
        "total_packs": new FormControl(""),

      });



    }


    closeDialog()
    {
      this.dialogRef.close();
    }



    // INIZIO metodo: caricaCategorie()
    caricaCategorie()
    {
      let catsOBS = this.categoriesS.getCategoriesObservable();
      catsOBS.subscribe((cats: any) => {
        this.categories = cats;
      });
    }
    // FINE metodo: caricaCategorie()

    // INIZIO metodo: ngOnInit()
    categoryByCatId(cat_id: number)
    {
      for (let i = 0; i < this.categories.length; i++)
      {
        if (this.categories[i].id == cat_id)
        {
          return this.categories[i].category;
        }
      }
      return null;
    }
    async ngOnInit()
    {
      this.caricaCategorie();
      if (this.id != undefined)
      {
        this.aggiunta = false;
        //this.categories = await this.categoriesS.getCategories();
        this.product = await this.productS.getProductById(this.id);
        let sendData = {
          "action" : this.config.api_actions.product_details,
          "loginINFO": this.authservice.getLoggedUser(),
          "product_id": this.id,
          "ip": this.authservice.getLoggedUser()!.ip,
          "token_id": this.authservice.getLoggedUser()!.token,
          "user_id": this.authservice.getLoggedUser()!.id
        }
        if ((Object)(this.product)!.RESULTS != "NOT AUTHORIZED")
                {
                  this.productForm.controls["id"].setValue(this.product.id);
                  this.productForm.controls["type_id"].setValue(this.product!.type_id);
                  this.productForm.controls["name"].setValue(this.product!.name);
                  this.productForm.controls["packaging_name"].setValue(this.product!.packaging_name);
                  this.productForm.controls["quantity"].setValue(this.product!.quantity);

                  this.productForm.controls["minimum_packages_stock"].setValue(this.product!.minimum_packages_stock);
                  this.productForm.controls["note"].setValue(this.product!.note);
                  this.productForm.controls["category_id"].setValue(this.product!.category_id, {onlySelf: true});
                  this.productForm.controls["category_name"].setValue(this.product!.category_name);
                  this.productForm.controls["piecebarcodecheck"].setValue(this.product!.piece_barcode!=null && this.product!.piece_barcode!=undefined && this.product!.piece_barcode!="");

                  this.productForm.controls["pieces_per_pack"].setValue(this.product!.pieces_per_pack);
                  this.productForm.controls["fornitore"].setValue(this.product!.fornitore);
                  this.productForm.controls["barcode"].setValue(this.product!.barcode);
                  this.productForm.controls["piece_barcode"].setValue(this.product!.piece_barcode);
                  if (this.productForm.controls["barcode"].value != null && this.productForm.controls["barcode"].value != undefined && this.productForm.controls["barcode"].value != "")
                  {
                    this.drawCode4Product(this.productForm.controls["barcode"].value);
                  }
                  if (this.productForm.controls["piece_barcode"].value != null && this.productForm.controls["piece_barcode"].value != undefined && this.productForm.controls["piece_barcode"].value != "")
                  {
                    this.drawCode4PieceOfProduct(this.productForm.controls["piece_barcode"].value);
                  }
                }
      }
      else
      {
        this.aggiunta = true;
      }
      if (this.authservice.getLoggedUser()!.userData.role!="ADMIN")
      {
        this.readonly = true;
      }
    }
    // FINE metodo: ngOnInit()


    // INIZIO metodo: openProductCategoriesDialog()
    openProductCategoriesDialog(enterAnimationDuration: string, exitAnimationDuration: string, data: any): void
    {
        this.dialog.open(CategoryManagementComponent, {
          width: "auto",
          height: "auto",
          minHeight: 'calc(100vh - 90px)',
          enterAnimationDuration,
          exitAnimationDuration,
          data: data,
          disableClose: true
        });
    }
    // FINE metodo: openProductCategoriesDialog()

    // INIZIO metodo: openProductOperationsManDialog()
    openProductOperationsManDialog(enterAnimationDuration: string, exitAnimationDuration: string, data: any)
    {
        this.dialog.open(ProductOperationsManComponent, {
          width: "auto",
          height: "auto",
          minHeight: 'calc(100vh - 90px)',
          enterAnimationDuration,
          exitAnimationDuration,
          data: data,
          disableClose: true
        });
    }
    // FINE metodo: openProductOperationsManDialog()

    // INIZIO metodo: openProductOperationsMan()
    openProductOperationsMan()
    {

      this.product.id = this.productForm.controls["id"].value;
      this.product.type_id = this.productForm.controls["type_id"].value;
      this.product.name = this.productForm.controls["name"].value;
      this.product.packaging_name = this.productForm.controls["packaging_name"].value;


      this.product.category_id = this.productForm.controls["category_id"].value;
      this.product.category_name = this.productForm.getRawValue().category_id;


      this.product.quantity = this.productForm.controls["quantity"].value;
      this.product.barcode = this.productForm.controls["barcode"].value;
      this.product.piece_barcode = this.productForm.controls["piece_barcode"].value;
      this.product.minimum_packages_stock = this.productForm.controls["minimum_packages_stock"].value;
      this.product.note = this.productForm.controls["note"].value;
      this.product.pieces_per_pack = this.productForm.controls["pieces_per_pack"].value;
      this.product.fornitore = this.productForm.controls["fornitore"].value;

      let date =  new Date();
      let date_day: any = date.getDate();
      let date_month: any = date.getMonth();
      let date_year: any = date.getFullYear();
      if (date_day < 10)
      {
        date_day = "0"+date_day;
      }
      if (date_month < 10)
      {
        date_month = "0"+date_month;
      }
      let date_str: any = date_year+"-"+date_month+"-"+date_day;

      this.openProductOperationsManDialog("0ms", "0ms", {
        product_id: this.product.id,
        user_id: this.product.user_id,
        login_token_id: this.authservice.getLoggedUser()!.token,
        IP: this.authservice.getLoggedUser()!.ip,
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDay(),
        "hours": date.getHours(),
        "minute": date.getMinutes(),
        date: date_str,
        timestampdate: date.getTime(),
        product: this.product,
        operations_list: this.product.operations_list,
        readonly: this.readonly
      });
    }
    // FINE metodo: openProductOperationsMan()

    dinamycTotal():number
    {
       return parseInt(this.product.quantity + this.totalOfOperationsList());
    }

    dinamycTotalPack()
    {
      this.productForm.controls["total_packs"].setValue(Math.ceil(this.dinamycTotal()/this.product.pieces_per_pack));


      return this.productForm.controls["total_packs"].value;
    }

    alertDinamycTotalPack()
    {
      alert(this.dinamycTotalPack());
    }

    totalOfOperationsList():number
    {
      let total: number = 0;
      for (let i = 0; i < this.product.operations_list.length; i++)
      {
        total += parseInt(this.product.operations_list[i].quantity);
      }
      return total;
    }
    openProductBarcodeMan(enterAnimationDuration: string, exitAnimationDuration: string, data: any)
    {
      this.ProductbarcodemanComponentDialog.open(ProductbarcodemanComponent, {
        width: "auto",
        height: "auto",
        minHeight: 'calc(100vh - 90px)',
        enterAnimationDuration,
        exitAnimationDuration,
        data: data,
        disableClose: true
      });
    }

    openProductCategoriesMan()
    {
      this.openProductCategoriesDialog("0ms", "0ms", {id: this.id, limitedFromOroductEdit: true, caricaCategorie: this.caricaCategorie});
    }

    openProductBarcodeForPackageMan()
    {
      this.openProductBarcodeMan("0ms", "0ms", {productForm: this.productForm});
    }

    openProductBarcodeForPieceMan()
    {
      this.openProductBarcodeMan("0ms", "0ms", {productForm: this.productForm});
    }

    setPiecebarcodecheckActive(value: boolean)
    {
      this.piecebarcodecheck = value;
    }

    setProductDataInForm(product=null)
    {
      if (product != null)
      {
        this.product = product;
      }
      this.productForm.controls["id"].setValue(this.product.id);
      this.productForm.controls["type_id"].setValue(this.product.type_id);
      this.productForm.controls["name"].setValue(this.product.name);
      this.productForm.controls["packaging_name"].setValue(this.product.packaging_name);
      this.productForm.controls["category_id"].setValue(this.product.category_id);
      this.productForm.controls["category_name"].setValue(this.product.category_name);
      this.productForm.controls["quantity"].setValue(this.product.quantity);
      this.productForm.controls["barcode"].setValue(this.product.barcode);
      this.productForm.controls["piece_barcode"].setValue(this.product.piece_barcode);
      this.productForm.controls["minimum_packages_stock"].setValue(this.product.minimum_packages_stock);
      this.productForm.controls["note"].setValue(this.product.note);
      this.productForm.controls["pieces_per_pack"].setValue(this.product.pieces_per_pack);
      this.productForm.controls["fornitore"].setValue(this.product.fornitore);
      this.product.stringify = JSON.stringify(product);
    }

    saveProduct(product_ifChangedPiecesPerPackOPTION: any)
    {
      this.product.ifChangedPiecesPerPackOPTION = product_ifChangedPiecesPerPackOPTION;

      if ( (this.barcode4product!.nativeElement.value!='' || this.barcode4pieceofproduct!.nativeElement.value!=''))
      {
        this.productForm.controls["barcode"].setValue(this.productForm.controls["barcode"].value.trim());
        this.productForm.controls["piece_barcode"].setValue(this.productForm.controls["piece_barcode"].value.trim());
        if ((this.productForm.controls["barcode"].value == this.productForm.controls["piece_barcode"].value) && this.productForm.controls["barcode"].value!=''&& this.productForm.controls["barcode"].value!=null)
        {
          alert("I codici a barre del prodotto e del pezzo singolo non possono essere uguali!");
          return;
        }
      }
      if (this.product.ifChangedPiecesPerPackOPTION!="Cancel save!")
      {


          this.product.id = this.productForm.controls["id"].value;
          this.product.type_id = this.productForm.controls["type_id"].value;
          this.product.name = this.productForm.controls["name"].value;
          this.product.packaging_name = this.productForm.controls["packaging_name"].value;


          this.product.category_id = this.productForm.controls["category_id"].value;
          this.product.category_name = this.productForm.getRawValue().category_id;


          this.product.quantity =  this.productForm.controls["total_packs"].value*this.productForm.controls["pieces_per_pack"].value; //this.productForm.controls["quantity"].value;
          this.product.barcode = this.productForm.controls["barcode"].value;
          this.product.piece_barcode = this.productForm.controls["piece_barcode"].value;
          this.product.minimum_packages_stock = this.productForm.controls["minimum_packages_stock"].value;
          this.product.note = this.productForm.controls["note"].value;
          this.product.pieces_per_pack = this.productForm.controls["pieces_per_pack"].value;
          this.product.fornitore = this.productForm.controls["fornitore"].value;

        
          this.productS.saveProduct(this.product).subscribe((productresponse: any) => {
                                                                                        let response = productresponse;
                                                                                        if (response)
                                                                                        {
                                                                                          alert(response);
                                                                                          response = JSON.parse(response);
                                                                                          if (response.state=="OK")
                                                                                          {
                                                                                              if (this.product.id!=-1 && this.product.id!=null)
                                                                                              {
                                                                                                this.opcom.loadMedicinalsTableIdToUp=response.product_id;
                                                                                              }
                                                                                              else
                                                                                              {
                                                                                                this.opcom.mustRefresh = true;
                                                                                              }
                                                                                              //this.setProductDataInForm(response.product);
                                                                                              this.closeDialog();
                                                                                              // redrawDataTable("loadMedicinalsTable");
                                                                                            //  window.location.reload();
                                                                                          }
                                                                                          else
                                                                                          {
                                                                                            alert("Errore: "+response.errMess);
                                                                                          }

                                                                                        }
                                                                                      });


      }
      else
      {
        alert("Salvataggio annullato!");
      }
    }

    save()
    {
      var product_ifChangedPiecesPerPackOPTION = this.product.ifChangedPiecesPerPackOPTION;

      if (this.product.id!=null)
      {
        if (this.product.pieces_per_pack!=this.productForm.controls["pieces_per_pack"].value)
        {
          const dialogRef: MatDialogRef<RefactorPiecesPerPackConfirmComponent> = this.dialog.open(RefactorPiecesPerPackConfirmComponent, {
            width: '600px',
            minHeight: '600px',
            height: 'auto',
            data: { /* dati da passare alla dialog */ }
          });

          dialogRef.afterClosed().subscribe(result => {
            if (result === 'Packs number must be unchanged!') {
              this.saveProduct(result);
            }
            else if (result === 'Packs number must be changed!') {
              this.saveProduct(result);
            }
            else if (result === "Packs number will be reset!")
            {
              this.saveProduct(result);
            }
            else if (result === "Cancel save!")
            {
              this.saveProduct(result);
            }
          });
        }
        else
        {
          this.saveProduct(null);
        }
      }
      else
        {
          this.saveProduct(null);
        }

    }

    reset_control_textarea()
    {
      this.controltextarea!.nativeElement.value = "";
    }

    put_data_in_control_textarea_data()
    {
      this.controltextarea!.nativeElement.value = JSON.stringify(this.product);
    }

    drawCode4Product(barcode: string)
    {
      let format = '';
      let formatName = getBarcodeType(barcode);
      if (formatName=="CODE-128")
      {
        format = 'CODE128';
      }
      else if (formatName=="CODE-39")
      {
        format = 'CODE39';
      }
      else if (formatName=="EAN-13")
      {
        format = 'EAN13';
      }
      else if (formatName=="EAN-8")
      {
        format = 'EAN8';
      }
      else if (formatName=="EAN-5")
      {
        format = 'EAN5';
      }
      else if (formatName=="EAN-2")
      {
        format = 'EAN2';
      }
      else if (formatName=="UPC-A")
      {
        format = 'UPC';
      }
      else if (formatName=="UPC-E")
      {
        format = 'UPC';
      }
      else if (formatName=="ITF-14")
      {
        format = 'ITF14';
      }
      else if (formatName=="ITF-6")
      {
        format = 'ITF';
      }
      else if (formatName=="MSI")
      {
        format = 'MSI';
      }
      else if (formatName=="MSI-10")
      {
        format = 'MSI10';
      }
      else if (formatName=="MSI-11")
      {
        format = 'MSI11';
      }
      else if (formatName=="MSI-1010")
      {
        format = 'MSI1010';
      }
      else if (formatName=="MSI-1110")
      {
        format = 'MSI1110';
      }
      else if (formatName=="pharmacode")
      {
        format = 'pharmacode';
      }
      else if (formatName=="codabar")
      {
        format = 'codabar';
      }
      else if (formatName=="Generic")
      {
        format = 'GenericBarcode';
      }
      else if (formatName=="Generic2")
      {
        format = 'GenericBarcode2';
      }
      else if (formatName=="Generic3")
      {
        format = 'GenericBarcode3';
      }
      else if (formatName=="Generic4")
      {
        format = 'GenericBarcode4';
      }
      else if (formatName=="Generic5")
      {
        format = 'GenericBarcode5';
      }
      else if (formatName=="Generic6")
      {
        format = 'GenericBarcode6';
      }
      else if (formatName=="Generic7")
      {
        format = 'GenericBarcode7';
      }
      else if (formatName=="Generic8")
      {
        format = 'GenericBarcode8';
      }
      else if (formatName=="Generic9")
      {
        format = 'GenericBarcode9';
      }
      else if (formatName=="Generic10")
      {
        format = 'GenericBarcode10';
      }
      else if (formatName=="Generic11")
      {
        format = 'GenericBarcode11';
      }
      else if (formatName=="Generic12")
      {
        format = 'GenericBarcode12';
      }
      else if (formatName=="Generic13")
      {
        format = 'GenericBarcode13';
      }
      else if (formatName=="Generic14")
      {
        format = 'GenericBarcode14';
      }
      else if (formatName=="Generic15")
      {
        format = 'GenericBarcode15';
      }
      if (formatName!="")
      {
        JsBarcode(this.barcode4product!.nativeElement, barcode, {
          format: format,
          displayValue: true,
        });
      }
    }

    drawCode4PieceOfProduct(barcode: string)
    {
      let format = '';
      let formatName = getBarcodeType(barcode);
      if (formatName=="CODE-128")
      {
        format = 'CODE128';
      }
      else if (formatName=="CODE-39")
      {
        format = 'CODE39';
      }
      else if (formatName=="EAN-13")
      {
        format = 'EAN13';
      }
      else if (formatName=="EAN-8")
      {
        format = 'EAN8';
      }
      else if (formatName=="EAN-5")
      {
        format = 'EAN5';
      }
      else if (formatName=="EAN-2")
      {
        format = 'EAN2';
      }
      else if (formatName=="UPC-A")
      {
        format = 'UPC';
      }
      else if (formatName=="UPC-E")
      {
        format = 'UPC';
      }
      else if (formatName=="ITF-14")
      {
        format = 'ITF14';
      }
      else if (formatName=="ITF-6")
      {
        format = 'ITF';
      }
      else if (formatName=="MSI")
      {
        format = 'MSI';
      }
      else if (formatName=="MSI-10")
      {
        format = 'MSI10';
      }
      else if (formatName=="MSI-11")
      {
        format = 'MSI11';
      }
      else if (formatName=="MSI-1010")
      {
        format = 'MSI1010';
      }
      else if (formatName=="MSI-1110")
      {
        format = 'MSI1110';
      }
      else if (formatName=="pharmacode")
      {
        format = 'pharmacode';
      }
      else if (formatName=="codabar")
      {
        format = 'codabar';
      }
      else if (formatName=="Generic")
      {
        format = 'GenericBarcode';
      }
      else if (formatName=="Generic2")
      {
        format = 'GenericBarcode2';
      }
      else if (formatName=="Generic3")
      {
        format = 'GenericBarcode3';
      }
      else if (formatName=="Generic4")
      {
        format = 'GenericBarcode4';
      }
      else if (formatName=="Generic5")
      {
        format = 'GenericBarcode5';
      }
      else if (formatName=="Generic6")
      {
        format = 'GenericBarcode6';
      }
      else if (formatName=="Generic7")
      {
        format = 'GenericBarcode7';
      }
      else if (formatName=="Generic8")
      {
        format = 'GenericBarcode8';
      }
      else if (formatName=="Generic9")
      {
        format = 'GenericBarcode9';
      }
      else if (formatName=="Generic10")
      {
        format = 'GenericBarcode10';
      }
      else if (formatName=="Generic11")
      {
        format = 'GenericBarcode11';
      }
      else if (formatName=="Generic12")
      {
        format = 'GenericBarcode12';
      }
      else if (formatName=="Generic13")
      {
        format = 'GenericBarcode13';
      }
      else if (formatName=="Generic14")
      {
        format = 'GenericBarcode14';
      }
      else if (formatName=="Generic15")
      {
        format = 'GenericBarcode15';
      }
      if (formatName!="")
      {
        JsBarcode(this.barcode4pieceofproduct!.nativeElement, barcode, {
          format: format,
          displayValue: true,
        });
      }
    }

    changeBarcode4Product()
    {
      this.drawCode4Product(this.productForm.controls["barcode"].value);
    }

    changeBarcode4PieceOfProduct()
    {
      this.drawCode4PieceOfProduct(this.productForm.controls["piece_barcode"].value);
    }

    generateBarcode4Product()
    {
      this.barcodeservice.newBarcodeCall().subscribe((barcode: any) => {
        this.productForm.controls["barcode"].setValue(barcode);
        if (getBarcodeType(barcode)=="CODE-128")
        {
          this.drawCode4Product(barcode);
          this.barcode4product!.nativeElement.style.width = "100%";
        }
      });

    }
    generateBarcode4PieceOfProduct()
    {
      this.barcodeservice.newBarcodeCall().subscribe((barcode: any) => {
        this.productForm.controls["piece_barcode"].setValue(barcode);
        this.drawCode4PieceOfProduct(barcode);
        this.barcode4pieceofproduct!.nativeElement.style.width = "100%";

      });
    }


    barcodeTypeOfProduct()
    {
      return getBarcodeType(this.productForm.controls["barcode"].value);
    }

    barcodeTypeOfPieceOfProduct()
    {
      return getBarcodeType(this.productForm.controls["piece_barcode"].value);
    }


    fromSvgToBase64(svgImage: any): Promise<string> {
      return new Promise((resolve, reject) => {
          const svgElement = svgImage.nativeElement;
          const svgString = new XMLSerializer().serializeToString(svgElement);

          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          if (!ctx) {
              reject('Impossibile ottenere il contesto del canvas');
              return;
          }

          const DOMURL = self.URL || self.webkitURL || self;
          const img = new Image();
          const svg = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});
          const url = DOMURL.createObjectURL(svg);

          img.onload = function() {
              ctx.drawImage(img, 0, 0);
              const png = canvas.toDataURL('image/png');
              DOMURL.revokeObjectURL(url);
              resolve(png);
          };

          img.onerror = function() {
              reject('Errore nel caricamento dell\'immagine');
          };

          img.src = url;
          document!.getElementById("barcodecol")!.innerHTML = img.src;
      });
  }

  public savePDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      //PDF.save('angular-demo.pdf');
      PDF.output('dataurlnewwindow')
    });
  }

  async printBarcode4Product()
  {
      this.printBarcode(this.barcode4product, this.productForm.controls["barcode"].value);
  /*  let docDefinition = {
      content: [
        {
          image: this.productForm.controls['barcode'].value,  // la tua stringa base64
          width: 500,
          Alignment: 'center'
        }
      ]
    };
    pdfMake.createPdf(docDefinition).open();
    */
  }

  printBarcode4PieceOfProduct()
  {
    this.printBarcode(this.barcode4pieceofproduct, this.productForm.controls["piece_barcode"].value);
  }

  async convertSvgToPng(imgElement:any) {
    const svgElement = imgElement.nativeElement as SVGSVGElement;

    // Creare un nuovo oggetto Image
    const img = new Image();

    // Creare un nuovo Blob con il codice SVG
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgData], { type: 'image/svg+xml' });

    // Creare un URL per il Blob
    const url = URL.createObjectURL(blob);

    // Assegnare l'URL come sorgente dell'immagine
    img.src = url;

    // Aspettare che l'immagine venga caricata
    await new Promise(res => img.onload = () => res(null));

    // Creare un nuovo elemento canvas e ottenere il contesto 2D
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;

    // Impostare le dimensioni del canvas per corrispondere alle dimensioni dell'immagine
    canvas.width = img.width;
    canvas.height = img.height;

    // Disegnare l'immagine sul canvas
    ctx.drawImage(img, 0, 0);

    // Ottenere il dato dell'immagine PNG
    const pngData = canvas.toDataURL('image/png');

    // Restituire il dato dell'immagine PNG
    return pngData;
  }


  printBarcode(barcodeimg: any, barcode: string)
  {
    //alert("Width image = "+barcodeimg.nativeElement.getBBox().width+" Height image = "+barcodeimg.nativeElement.getBBox().height);
    this.convertSvgToPng(barcodeimg).then((base64: string) => {

      this.dialog.open(BarcodeforprintComponent, {
        width: "auto",
        height: "auto",
        minHeight: 'calc(100vh - 90px)',
        minWidth: 'calc(100vw - 90px)',
        data: {barcodeimage: base64, barcode: barcode},
        disableClose: true
      });
    });
   /* this.fromSvgToBase64(barcodeimg).then((base64: string) => {
      alert(base64);
      this.dialog.open(BarcodeforprintComponent, {
        width: "auto",
        height: "auto",
        minHeight: 'calc(100vh - 90px)',
        minWidth: 'calc(100vw - 90px)',
        data: {barcodeimage: base64},
        disableClose: true
      });
    });
    */
  }



}


