import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
declare var init_view: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  accessData : any = {
    email     : null,
    password  : null
  }


  constructor (private router: Router, private authservice: AuthService)
  {

  }
  ngOnInit() {

    init_view("login");
  }


  login(username: String, password: String)
  {
    this.authservice.logUser(username, password);
  }

  dologin()
  {
    // this.login(this.accessData.email, this.accessData.password);
    this.authservice.logUserOBS(this.accessData.email, this.accessData.password).
    subscribe((data)=>{
  
        this.authservice.setLoggedUserData(data);
        if (this.authservice.user?.token!=null)
        {

          this.router.navigate(['/home']);
        }
    });

  }

  check()
  {
    let tempUser = localStorage.getItem('user');

    if (tempUser!=null)
    {
      tempUser = JSON.parse(tempUser);
      this.authservice.user = new User((Object)(tempUser).id, (Object)(tempUser).adamant, (Object)(tempUser).user_id, (Object)(tempUser).start_time, (Object)(tempUser).ip, (Object)(tempUser).token_id, (Object)(tempUser).refresh_token, (Object)(tempUser)._expirationDate, (Object)(tempUser).active, (Object)(tempUser).userData);
    }
  }

}
