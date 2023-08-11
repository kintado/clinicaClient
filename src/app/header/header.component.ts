import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router,NavigationStart, Event as NavigationEvent } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AuthService } from '../services/auth.service';
import { StockService } from '../services/stock.service';
import { MatDialog } from '@angular/material/dialog';
import { StockReportComponent } from '../views/stock-report/stock-report.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public mypath: string | undefined;
  constructor(private router: Router, public authservice: AuthService,  public stockserv: StockService, public stockReportDialog: MatDialog) {
    this.router.events
          .subscribe(
            (event: NavigationEvent) => {
              if(event instanceof NavigationStart) {
                this.mypath = event.url;
              }
            });
   }
  ngOnInit() {
    console.log("URL="+location.pathname);


  }

  logout()
  {
   this.authservice.logout();
  }

  isAdministrator()
  {
    if (this.authservice.getLoggedUser()==null)
      return false;
      else
      {
        if (this.authservice!.getLoggedUser()!=null && this.authservice!.getLoggedUser()!.userData!=null)
        {
          return (this.authservice!.getLoggedUser()!.userData.role=="ADMIN");
        }
        else
        {
          return false;
        }

      }

  }

  openStockReport()
  {
    this.stockReportDialog.open(StockReportComponent, {
      width: '100vw',
      height: '100vh',
      data: { }
    });
  }
}
