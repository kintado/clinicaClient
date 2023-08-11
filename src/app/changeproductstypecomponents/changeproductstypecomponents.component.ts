import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';

@Component({
  selector: 'app-changeproductstypecomponents',
  templateUrl: './changeproductstypecomponents.component.html',
  styleUrls: ['./changeproductstypecomponents.component.css']
})
export class ChangeproductstypecomponentsComponent {

    constructor(private activatedroute: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.activatedroute.params.subscribe(params => {
            if (params['type_id']!=undefined)
            {
              location.href = "/productslistview/"+params['type_id'];
                //this.router.navigate(['products', params['type_id']]);
            }
          });
        }
      });

    }
}
