import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AuthService } from './auth.service';
import { ConfigService } from './config/config.service';
import { userData } from '../models/userData';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  usersList: any = [

  ]
  constructor(private http: HttpClient, private config: ConfigService, private authservice: AuthService) { }

  loadUsersOBS()
  {
         return this.http.post(this.config.api_url, {
        "action" : this.config.api_actions.users_list,
        "ip": this.authservice.getLoggedUser()!.ip,
        "token": this.authservice.getLoggedUser()!.token,
        "user_id": this.authservice.getLoggedUser()!.id
      }, { responseType: 'json' }   );
  }

  async loadUsers()
  {
    return await lastValueFrom(this.loadUsersOBS());
  }

  callSaveUser(user: any)
  {
    return this.http.post(this.config.api_url, {
      "action" : this.config.api_actions.save_user,
      "ip": this.authservice.getLoggedUser()!.ip,
      "token": this.authservice.getLoggedUser()!.token,
      "user": user
    }, { responseType: 'text' }   );
  }

  callVerifyUserAlreadyExists(username: String, email: String)
  {
    return this.http.post(this.config.api_url, {
      "action" : this.config.api_actions.verify_user_already_exists,
      "ip": this.authservice.getLoggedUser()!.ip,
      "token": this.authservice.getLoggedUser()!.token,
      "username": username,
      "email": email
    }, { responseType: 'json' }   );
  }

  obsUserIsDeletable(user_id: number)
  {
    return this.http.post(this.config.api_url, {
      "action" : this.config.api_actions.user_is_deletable,
      "ip": this.authservice.getLoggedUser()!.ip,
      "token": this.authservice.getLoggedUser()!.token,
      "user_id": user_id
    }, { responseType: 'json' }   );
  }

  delete(user_id: number)
  {
    return this.http.post(this.config.api_url, {
      "action" : this.config.api_actions.user_delete ,
      "ip": this.authservice.getLoggedUser()!.ip,
      "token": this.authservice.getLoggedUser()!.token,
      "user_id": user_id
    }, { responseType: 'json' }   );
  }

  setRole(user_id: number, role: String)
  {
    return this.http.post(this.config.api_url, {
      "action" : this.config.api_actions.set_user_role ,
      "ip": this.authservice.getLoggedUser()!.ip,
      "token": this.authservice.getLoggedUser()!.token,
      "user_id": user_id,
      "role": role
    }, { responseType: 'json' }   );
  }

  setActiveState(user_id:number, state: boolean)
  {
    var intstate = 0;
    if (state)
    {
      intstate = 1;
    }

    return this.http.post(this.config.api_url, {
      "action" : this.config.api_actions.set_user_active_state ,
      "ip": this.authservice.getLoggedUser()!.ip,
      "token": this.authservice.getLoggedUser()!.token,
      "user_id": user_id,
      "state": intstate
    }, { responseType: 'json' }   );
  }

  deleteUsers(selectedUsersIDlist: any)
  {
    return this.http.post(this.config.api_url, {
      "action" : this.config.api_actions.user_list_delete ,
      "ip": this.authservice.getLoggedUser()!.ip,
      "token": this.authservice.getLoggedUser()!.token,
      "selectedUsersIDlist": selectedUsersIDlist
    }, { responseType: 'text' }   );
  }
}
