import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config/config.service';
import { lastValueFrom } from 'rxjs';
import { AuthService } from './auth.service';
declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient, private config: ConfigService, private authservice:AuthService) { }
  catres: any = [];

  getObsProductDataById(product_id: any)
  {
    return this.http.post(this.config.api_url, {
      "action" : this.config.api_actions.product_details,
      "loginINFO": this.authservice.getLoggedUser(),
      "product_id": product_id,
      "ip": this.authservice.getLoggedUser()!.ip,
        "token_id": this.authservice.getLoggedUser()!.token,
        "user_id": this.authservice.getLoggedUser()!.id
    }, { responseType: 'json' }   );
  }

  async getProductById(product_id: any)
  {

    let res = null;
    let productRequest$ = this.getObsProductDataById(product_id);

    let promise = lastValueFrom(productRequest$);

    await promise.then(   (productresponse: any) => {


      if (productresponse!.RESULTS == "NOT AUTHORIZED")
      {

        res = {
          "RESULTS": "NOT AUTHORIZED"
        }
      }
      else
      {

        var product = (Object)(productresponse);

        res = {
          "id": (Object)(productresponse).id,
          "type_id": (Object)(productresponse).type_id,
          "name": (Object)(productresponse).name,
          "packaging_name": (Object)(productresponse).packaging_name
        }


        if ((Object)(productresponse).category!=null)
        {
          (Object)(res).category_name = (Object)(productresponse).category.category;
        }
        (Object)(res).category_id = product.category_id;

        (Object)(res).quantity = (Object)(productresponse).quantity;

        (Object)(res).barcode = (Object)(productresponse).barcode;
        (Object)(res).piece_barcode = (Object)(productresponse).piece_barcode;
        (Object)(res).minimum_packages_stock = (Object)(productresponse).minimum_packages_stock;
        (Object)(res).note = (Object)(productresponse).note;
        (Object)(res).ip = this.authservice.getLoggedUser()!.ip;
        (Object)(res).token = this.authservice.getLoggedUser()!.token;
        (Object)(res).user_id = this.authservice.getLoggedUser()!.id;
        (Object)(res).operations_list = (Object)(productresponse).operations_list;
        (Object)(res).pieces_per_pack = (Object)(productresponse).pieces_per_pack;
        (Object)(res).total = (Object)(productresponse).total;
        (Object)(res).total_packs = (Object)(productresponse).total_packs;
        (Object)(res).total_pieces = (Object)(productresponse).total_pieces;
        (Object)(res).total_pieces_per_pack = (Object)(productresponse).total_pieces_per_pack;
        (Object)(res).fornitore = (Object)(productresponse).fornitore;


      }
    });

    return res;
  }

  OBSSaveProduct(product: any)
  {
     return this.http.post(this.config.api_url, {
      "action" : this.config.api_actions.product_save,
      "loginINFO": JSON.stringify(this.authservice.getLoggedUser()),
      "product": product,
      "ip": this.authservice.getLoggedUser()!.ip,
      "token": this.authservice.getLoggedUser()!.token,
      "user_id": this.authservice.getLoggedUser()!.id }, { responseType: 'text' }   );

  }

  saveProduct(product: any): any
  {
    if (product!.category_id == null || product!.category_id == "" || product!.category_id == undefined || product!.category_id == 0)
    {
      alert("Devi selezionare una categoria!");
      return;
    }

    return   this.http.post(this.config.api_url, {
      "action" : this.config.api_actions.product_save,
      "loginINFO": JSON.stringify(this.authservice.getLoggedUser()),
      "product": product,
      "ip": this.authservice.getLoggedUser()!.ip,
      "token": this.authservice.getLoggedUser()!.token,
      "user_id": this.authservice.getLoggedUser()!.id }, { responseType: 'text' }   );



  }

  deleteProductById(product_id: any)
  {
    let res = null;
    let data = {
      "action" : this.config.api_actions.product_delete,
      "loginINFO": JSON.stringify(this.authservice.getLoggedUser()),
      "product_id": product_id,
      "ip": this.authservice.getLoggedUser()!.ip,
      "token": this.authservice.getLoggedUser()!.token,
      "user_id": this.authservice.getLoggedUser()!.id
    }
    $.ajax({
      type: "POST",
      url: this.config.api_url,
      data: JSON.stringify(data),
      async: false,
      success: function (response:any) {
        res = response;
      },
      error: function (xhr:any, status:any, error:any) {
        alert("Error: " + error.message);
      }
    });

    return res;
  }

  CallProductsList(type: number): any
  {
    return this.http.post(this.config.api_url, {
      "action" : this.config.api_actions.products_list,
      "loginINFO": JSON.stringify(this.authservice.getLoggedUser()),
      "type": type,
      "ip": this.authservice.getLoggedUser()!.ip,
      "token": this.authservice.getLoggedUser()!.token,
      "user_id": this.authservice.getLoggedUser()!.id }, { responseType: 'text' }   );
  }

  deleteListOfProductsByIdsOBS(IDLIST: any): any
  {
    let data = {
      "action" : this.config.api_actions.delete_list_of_products_by_id,
      "IDLIST": IDLIST,
      /*
      "loginINFO": JSON.stringify(this.authservice.getLoggedUser()),
      "ip": this.authservice.getLoggedUser()!.ip,
      "token": this.authservice.getLoggedUser()!.token,
      "user_id": this.authservice.getLoggedUser()!.id
      */
    }


    return this.http.post(this.config.api_url, data, { responseType: 'text' }   );

  }

  printListOfProductsByIdsOBS(IDLIST: any): any
  {
    let data = {
      "action" : this.config.api_actions.make_pdf_of_products_list,
      "IDLIST": IDLIST,
    }
    return this.http.post(this.config.api_url, data, { responseType: 'text' }   );
  }

  // productOperationsList(product_id: any): any
  // {
  //   let data = {
  //     "action" : this.config.api_actions.product_operations_list,
  //     "product_id": product_id,
  //     /*
  //     "loginINFO": JSON.stringify(this.authservice.getLoggedUser()),
  //     "ip": this.authservice.getLoggedUser()!.ip,
  //     "token": this.authservice.getLoggedUser()!.token,
  //     "user_id": this.authservice.getLoggedUser()!.id
  //     */
  //   }
  //   return this.http.post(this.config.api_url, data, { responseType: 'text' }   );
  // }

  product_operations_list_of_month_and_year(product_id: any, month: any, year: any): any
  {
    let data = {
      "action" : this.config.api_actions.product_operations_list_of_month_and_year,
      "product_id": product_id,
      "month": month,
      "year": year,
      /*
      "loginINFO": JSON.stringify(this.authservice.getLoggedUser()),
      "ip": this.authservice.getLoggedUser()!.ip,
      "token": this.authservice.getLoggedUser()!.token,
      "user_id": this.authservice.getLoggedUser()!.id
      */
    }
    return this.http.post(this.config.api_url, data, { responseType: 'json' }   );
  }

  print_product_operations_list_of_month_and_year(product_id: any, operationsList: any)
  {
    let data = {
      "action" : this.config.api_actions.make_pdf_of_product_operations_list,
      "product_id": product_id,
      "operationsList": operationsList,
    }
    return this.http.post(this.config.api_url, data, { responseType: 'text' }   );
  }
}
