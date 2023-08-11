import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCalendarCellCssClasses} from '@angular/material/datepicker'
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
declare var init_view: any;

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
  loggedUser: any = null;
  dateStringSelected: String | undefined;
  selectedDate: Date | undefined;
  dateclass: any | undefined;
  myCalendar: any;
  constructor( public authservice: AuthService, private router: Router) { }
  onSelectDate(event: any, myCalendar: any) {
    console.log(event.getMonth()); 
    this.dateStringSelected = event.getDate()+"/"+event.getMonth()+"/"+event.getFullYear();
    this.selectedDate = event;   
    if (this.selectedDate !== undefined)
    {
   //   alert(this.selectedDate.getDate());
    } 
    this.dateclass = this.dateClass();
    myCalendar.updateTodaysDate();
    
  }
  
  dateClass() {
    let matcells: MatCalendarCellCssClasses;
    matcells = 'special-date';
    return (date: Date): MatCalendarCellCssClasses => {  
      if (date.getDate() === 1 || date.getDate() === 19) 
      {
        return 'special-date';
      }
       
      else if (this.selectedDate?.getDate()==date.getDate())
      {
        return 'selected-date';
      }
      else 
      {
        return '';
      }
    };
  }
  
  
  ngOnInit() 
  {     
    if (this.authservice.getLoggedUser()!.token!=null)
    {
      init_view("agenda");
      this.dateclass = this.dateClass();
    }
    else
    {      
      this.router.navigate(['/login']);
    }    

  }
 

}


