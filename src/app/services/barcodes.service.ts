import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config/config.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BarcodesService {

  constructor(private http: HttpClient, private config: ConfigService, private authservice: AuthService) { }

  newBarcodeCall(): any
  {
    let url = this.config.api_url;
    let data = {
      "action": this.config.api_actions.new_barcode,
    }
    return this.http.post(url, data, { responseType: 'text' });

  }
}
