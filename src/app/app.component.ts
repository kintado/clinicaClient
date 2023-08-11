import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { User } from './models/user.model';
import { AuthService } from './services/auth.service';
import { NotifiesServicesService } from './services/notifies-services.service';
import { StockService } from './services/stock.service';
import { StockReportComponent } from './views/stock-report/stock-report.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = '.:: Clinical Pharmacology ::.';
  constructor(private authservice: AuthService, private router: Router, private notifyserv: NotifiesServicesService, private stockserv: StockService) {

  }

  loggedUser: any = null;

  ngOnInit() {
    verify_positions();
    this.setIntervalLogindUserControl();
    // this.notifyserv.notifies_list_of_products_in_stock_http().subscribe((notifies:any) => {

    //   notifies.forEach((notify:any) => {
    //     alert("Il prodotto " + notify.name + " è in esaurimento");
    //   });
    // });
    this.stockserv.refreshStockProducts();
  }

  setIntervalLogindUserControl()
  {
    const intervallo = interval(1000);
    intervallo.subscribe((x) => {
                                      this.loggedUser = this.authservice.getLoggedUser();
                                      if (this.authservice.getLoggedUser()!.token==null)
                                      {
                                        this.router.navigate(['/login']);
                                      }

                                    });
  }



}
function verify_positions()
{
  let header_container = document.getElementById("header_container");
  let main_container = document.getElementById("main_container");
  let window_height = window.innerHeight;
  if (header_container!=null && main_container!=null)
  {
    let header_height = header_container.offsetHeight;
    let main_height = window_height - header_height;
    main_container.style.height = main_height + "px";
  }
}
