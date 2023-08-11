import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config/config.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog, } from '@angular/material/dialog';
import { EditProductComponent } from '../product-edit/edit-product.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { interval } from 'rxjs';
import { CommunicatorService } from 'src/app/services/communications/communicator.service';
import { lastValueFrom } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { DialogServicesService } from 'src/app/services/dialog-services.service';
import { OpComWaitingService } from 'src/app/services/op-com-waiting.service';
import { MakePdfOfProductsListComponent } from '../make-pdf-of-products-list/make-pdf-of-products-list.component';

declare var $: any;
declare var init_view: any;
declare var initDataTable: any;
declare var redrawDataTable: any;
declare var regenerateDataTable: any;
declare var destroyDataTable: any;
declare var scanBarcodeForProductsList: any;
declare var filterByBarcode: any;


@Component({
  selector: 'medicinals-view',
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.css']
})
export class MedicinesListViewComponent implements OnInit {
  loggedUser: any = null;
  productType: number = 1;
  RESULT: any = null;
  drugsList: any = [

  ]

  constructor(private http: HttpClient, private chRef: ChangeDetectorRef, public config: ConfigService, public dialog: MatDialog, public authservice: AuthService, private router: Router, private route: ActivatedRoute, private comm:CommunicatorService, private productservice: ProductsService, private dialogserv: DialogServicesService, private opcom: OpComWaitingService) {

  }

  controlIfExistsCommOfRefresh()
  {
 /*
    if (this.comm.xMedicinesListViewComponent=="REFRESH")
    {
      this.comm.xMedicinesListViewComponent = "";
      this.loadmedicineslist();
    }
    */
   this.mustToUpdate();
   this.mustRefresh();
  }

  setTimerForRefresh()
  {
    const source = interval(1000);
    const subscribe = source.subscribe(val => this.controlIfExistsCommOfRefresh());
  }

  async loadmedicineslist()
  {

    let API_CODE = null;
    alert(this.productType)
    if (this.productType==1)
    {
      API_CODE = this.config.api_actions.medicines_list;
    }
    else if (this.productType==2)
    {
      API_CODE = this.config.api_actions.medical_utilities_list;
    }


    let medobs = this.http.post(this.config.api_url, {
      "action" : API_CODE,
      "loginINFO": this.authservice.getLoggedUser()
    }, { responseType: 'json' }   );

    let medprom = lastValueFrom(medobs);

    let response:any = await medprom;


    if (response!.RESULTS == "NOT AUTHORIZED")
    {
      this.RESULT = "NOT AUTHORIZED";
      return;
    }
    this.RESULT = "OK";
    this.drugsList = [];

    for(let i = 0; i < response.length; i++)
    {
      if (response[i].type_id==1)
      {
        response[i].type = "Medicina";
      }
      else if (response[i].type_id==2)
      {
        response[i].type = "Presidio";
      }
      this.drugsList.push(response[i]);
    }
    this.chRef.detectChanges();

  }

  loadMedicinals()
  {


      let API_CODE = null;
      if (this.productType==1)
      {
        API_CODE = this.config.api_actions.medicines_list;
      }
      else if (this.productType==2)
      {
        API_CODE = this.config.api_actions.medical_utilities_list;
      }

      this.http.post(this.config.api_url, {
        "action" : API_CODE,
        "loginINFO": this.authservice.getLoggedUser()
      }, { responseType: 'json' }   ).subscribe(   (response: any) => {



        if (response!.RESULTS == "NOT AUTHORIZED")
        {
          this.RESULT = "NOT AUTHORIZED";
          return;
        }
        this.RESULT = "OK";
        this.drugsList = [];

        for(let i = 0; i < response.length; i++)
        {
            if (response[i].type_id==1)
            {
              response[i].type = "Medicina";
            }
            else if (response[i].type_id==2)
            {
              response[i].type = "Presidio";
            }
            this.drugsList.push(response[i]);
        }
        this.chRef.detectChanges();
        initDataTable('loadMedicinalsTable');
        let productsTable = $('#loadMedicinalsTable').DataTable();
        productsTable.on('page.dt', ()=>{
          //alert("cazoooo");
        });
        // Rimuovi gli input di ricerca da ogni colonna

      } );

  }
  public drugsListIsArray()
  {
    return Array.isArray(this.drugsList);
  }
  public drugsListinStr()
  {
    return JSON.stringify(this.drugsList);
  }

  ngOnInit()
  {

    if (this.authservice.getLoggedUser()!.token!=null)
    {
      let type = "medicines";
      this.drugsList = [];
      init_view("drugs");

      this.loadMedicinals();
      this.setTimerForRefresh();
    }
    else
    {
      this.router.navigate(['/login']);
    }



  }
  logout()
  {
    this.authservice.logout();
  }
  openEditProductDialog(enterAnimationDuration: string, exitAnimationDuration: string, data: any): void {

    this.dialog.open(EditProductComponent, {
      width: "auto",
      height: "auto",

      enterAnimationDuration,
      exitAnimationDuration,
      data: data,
      disableClose: true
    });
  }

  editProduct(id: any)
  {
    this.openEditProductDialog("0ms", "0ms", {type_id: 1, id: id});
  }

  editProductReadOnly(id: number)
  {
    this.openEditProductDialog("0ms", "0ms", {type_id: 1, id: id, readonly: true});
  }

  newProduct()
  {
    this.editProduct(null);
  }

  removeTableRowById(id: number)
  {
    var row_id = 'table_row_'+id;

    var row = document.getElementById(row_id);
    if (row)
    {
      document.getElementById('tbodyproducts')!.removeChild(row!);
    }

  }

  deleteProduct(id: any)
  {
    this.dialogserv.ConfirmOperationDialog("CONFERMA DI ELIMINAZIONE", "Eliminare il prodotto selezionato? (l'eliminazione rimuoverà, in automatico tutte le informazioni sul prodotto (ivi compresi carichi e scarichi di quantita')",
                                            ()=>{

                                                        let res:any = this.productservice.deleteProductById(id);
                                                       // alert(JSON.stringify(res));
                                                        if (res=="1")
                                                        {
                                                          this.dialogserv.alertOperationDialog("CONFERMA DI ELIMINAZIONE", "Eliminato!",  ()=>{
                                                            this.removeTableRowById(id);
                                                            this.dialog.closeAll();
                                                             });

                                                        }
                                                        else
                                                        {
                                                            alert("Errore");
                                                        }

                                                      },
                                            ()=>{

                                            });

  }



  mustToUpdate()
  {

    if (this.opcom.loadMedicinalsTableIdToUp!=-1 && !this.opcom.loadMedicinalsTableIdToUpInExecution)
    {

      this.opcom.loadMedicinalsTableIdToUpInExecution = true;
      this.productservice.getObsProductDataById(this.opcom.loadMedicinalsTableIdToUp).subscribe((response: any)=>{


          var tr = document.getElementById('table_row_'+response.id);
          if (tr)
          {

            document.getElementById("category_name_of_pid"+response.id)!.innerHTML = response.category;
            document.getElementById("name_of_pid"+response.id)!.innerHTML = response.name;
            document.getElementById("packaging_name_of_pid"+response.id)!.innerHTML = response.packaging_name;
            document.getElementById("barcode_of_pid"+response.id)!.innerHTML = response.barcode;
            document.getElementById("pieces_per_pack_of_pid"+response.id)!.innerHTML = response.pieces_per_pack;
            document.getElementById("minimum_packages_stock_of_pid"+response.id)!.innerHTML = response.minimum_packages_stock;
            document.getElementById("total_pieces_"+response.id+"_div")!.innerHTML = response.total;
            document.getElementById("total_packs"+response.id)!.innerHTML = response.total_packs;

            this.opcom.loadMedicinalsTableIdToUpInExecution = false;
            this.opcom.loadMedicinalsTableIdToUp=-1
          }
      })
    }
  }

  mustRefresh()
  {
    if (this.opcom.mustRefresh)
    {
      window.location.reload();
    }
  }

  authservicegetLoggedUserInJSON()
  {
    return JSON.stringify(this.authservice.getLoggedUser()!.userData.role);
  }
  startBarcodeScanner()
  {
    scanBarcodeForProductsList("loadMedicinalsTable", filterByBarcode);
  }

  setAsGlobalAllProductCheckboxes()
  {
    var global_checkbox = document.getElementById("global_checkbox") as HTMLInputElement;
    var checkboxes = document.getElementsByName("product_checkbox");
    for(let i = 0; i < checkboxes.length; i++)
    {
      (checkboxes[i] as HTMLInputElement).checked = global_checkbox.checked;
    }
    if (global_checkbox.checked)
    {
      $('#loadMedicinalsTable').closest('.dataTables_wrapper').find('.dataTables_paginate').hide();
    }
    else
    {
      $('#loadMedicinalsTable').closest('.dataTables_wrapper').find('.dataTables_paginate').show();
    }
    this.getListOfSelectedProductsID();
  }

  getListOfSelectedProductsID()
  {
    var checkboxes = document.getElementsByName("product_checkbox");
    var selected = [];
    for(let i = 0; i < checkboxes.length; i++)
    {
      if ((checkboxes[i] as HTMLInputElement).checked)
      {
        let component_id = (checkboxes[i] as HTMLInputElement).id;
        let id = component_id.split("_")[2];
        selected.push(id);
      }
    }
   // alert(JSON.stringify(selected));
    return selected;
  }

  countRowsOfthisPage()
  {
    var global_checkbox = document.getElementById("global_checkbox") as HTMLInputElement;
    return global_checkbox.checked ? 0 : $('#loadMedicinalsTable').DataTable().rows().count();
  }

  deleteSelectedProducts()
  {
    let listID = this.getListOfSelectedProductsID();
    if (listID.length==0)
    {
      alert("Nessun prodotto selezionato");
      return;
    }
    else
    {
      this.dialogserv.ConfirmOperationDialog("CONFERMA DI ELIMINAZIONE", "Eliminare i prodotti selezionati? (l'eliminazione rimuoverà, in automatico tutte le informazioni sui prodotti (ivi compresi carichi e scarichi di quantita')",
      ()=>{
              this.productservice.deleteListOfProductsByIdsOBS(listID).subscribe((Response:any) => {
                if (!isNaN(Response))
                {
                    let n = parseInt(Response);
                    if (n>0)
                    {
                            this.dialogserv.alertOperationDialog("CONFERMA DI ELIMINAZIONE", "Eliminati!",  ()=>{
                              for(let i = 0; i < listID.length; i++)
                              {
                                this.removeTableRowById(parseInt(listID[i]));
                              }
                              this.dialog.closeAll();
                          });
                    }
                    else
                    {
                          this.dialogserv.alertOperationDialog("QUALCOSA NON VA", "OPERAZIONE TECNICAMENTE ANDATA BENE, MA NESSUN RECORD MI RISULTA ELIMINATO!",  ()=>{
                            for(let i = 0; i < listID.length; i++)
                            {
                              this.removeTableRowById(parseInt(listID[i]));
                            }
                            this.dialog.closeAll();
                        });
                    }
          }
          else
          {
            alert("Errore");
          }
        });
    /*    if (res=="1")
        {
          this.dialogserv.alertOperationDialog("CONFERMA DI ELIMINAZIONE", "Eliminati!",  ()=>{
          for(let i = 0; i < listID.length; i++)
          {
            this.removeTableRowById(parseInt(listID[i]));
          }
          this.dialog.closeAll();
            });

        }
        else
        {
            alert("Errore");
        }
*/
      },
      ()=>{

      });


    }

  }

  printListOfSelectedProducts()
  {
    let listID = this.getListOfSelectedProductsID();
    if (listID.length==0)
    {
      alert("Nessun prodotto selezionato");
      return;
    }
    else
    {

      this.dialog.open(MakePdfOfProductsListComponent, {
        width: "auto",
        height: "auto",
        minHeight: 'calc(100vh - 90px)',
        minWidth: 'calc(100vw - 90px)',
        data: {listID: listID},
        disableClose: true
      });

    }
  }

}
