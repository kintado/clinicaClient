import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config/config.service';
import { lastValueFrom } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient, private config: ConfigService, private authservice: AuthService) { }
  catres: any = [];
  getCategoriesObservable()
  {
    return this.http.post(this.config.api_url, {
      "action" : this.config.api_actions.get_product_categories,
      "ip": this.authservice.getLoggedUser()!.ip,
      "token": this.authservice.getLoggedUser()!.token,
      "user_id": this.authservice.getLoggedUser()!.id
    }, { responseType: 'json' }   ); 
  }
  async getCategories()
  {        
      let productRequest$ = this.getCategoriesObservable();            
      let promise = lastValueFrom(productRequest$);
      let res = await promise;      
      return res;          
  }
  
  categoryHasProductObservable(category_id: any)
  {
    let sendDati = {
      "action" : this.config.api_actions.category_has_product,
      "loginINFO": this.authservice.getLoggedUser(),
      "category_id": category_id,
      "ip": this.authservice.getLoggedUser()!.ip,
      "token_id": this.authservice.getLoggedUser()!.token,
      "user_id": this.authservice.getLoggedUser()!.id
    }
 
    return this.http.post(this.config.api_url, sendDati, { responseType: 'json' }   );
  }

  deleteCategoryByIdObservable(category_id: any)
  {
    let sendDati = {
      "action" : this.config.api_actions.delete_category_by_id,
      "loginINFO": this.authservice.getLoggedUser(),
      "category_id": category_id,
      "ip": this.authservice.getLoggedUser()!.ip,
      "token_id": this.authservice.getLoggedUser()!.token,
      "user_id": this.authservice.getLoggedUser()!.id
  }

    return this.http.post(this.config.api_url, sendDati, { responseType: 'json' }   );
  }

  addCategoryObservable(category_name: any)
  {
    let sendDati = {
      "action" : this.config.api_actions.add_category_by_name,
      "loginINFO": this.authservice.getLoggedUser(),
      "category_name": category_name,
      "ip": this.authservice.getLoggedUser()!.ip,
      "token_id": this.authservice.getLoggedUser()!.token,
      "user_id": this.authservice.getLoggedUser()!.id      
    }
    return this.http.post(this.config.api_url, sendDati, { responseType: 'json' }   );
  }

}
