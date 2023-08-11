import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config/config.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotifiesServicesService {

  constructor(private http: HttpClient, private config: ConfigService, private authservice:AuthService) { }
  notifies_list_of_products_in_stock_http(): any
  {
    return this.http.post(this.config.api_url, {
      "action" : this.config.api_actions.notifies_list_of_products_in_stock,
      "loginINFO": this.authservice.getLoggedUser(),
      "ip": this.authservice.getLoggedUser()!.ip,
        "token_id": this.authservice.getLoggedUser()!.token,
        "user_id": this.authservice.getLoggedUser()!.id
    }, { responseType: 'json' }   );

  }
}
