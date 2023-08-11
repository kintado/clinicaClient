import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ConfigService } from './config/config.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient, private config: ConfigService, private authservice:AuthService)
  {

  }

  public stockProducts = [];
  public nStockProducts = 0;
  public refreshStockProducts()
  {
    this.stockProducts = [];
    this.http.post(this.config.api_url, {
      "action" : this.config.api_actions.stock_list,
      "loginINFO": this.authservice.getLoggedUser(),
      "ip": this.authservice.getLoggedUser()!.ip,
      "token_id": this.authservice.getLoggedUser()!.token,
      "user_id": this.authservice.getLoggedUser()!.id
    }, { responseType: 'json' }   ).subscribe((response: any) => {

                                                                    if (response == "NOT AUTHORIZED")
                                                                    {
                                                                      this.stockProducts = [];
                                                                    }
                                                                    else
                                                                    {
                                                                      this.stockProducts = response;
                                                                    }
                                                                    this.nStockProducts = this.stockProducts.length;

    });
  }


}
