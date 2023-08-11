import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { interval } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

declare var init_view: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements  OnInit {

  constructor(private router: Router, public authservice: AuthService) { }

  alertUser()
  {
    alert(JSON.stringify(this.authservice.getLoggedUser()));
  }

  ngOnInit()
  {

    if (this.authservice.getLoggedUser()!.token!=null)
    {
      init_view("home");
    }
    else
    {
      this.router.navigate(['/login']);
    }
  }

  drugsButtonClick()
  {
    this.router.navigate(['/medicines']);
  }

  medicalPrincipalsButtonClick()
  {
    this.router.navigate(['/medical-utilities']);
  }


}
