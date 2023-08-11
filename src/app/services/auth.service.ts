import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { ConfigService } from './config/config.service';

@Injectable({
  providedIn: 'root'
})
/*
AuthService
{
  **************************************************************************************
  user: User | undefined;
  
  **************************************************************************************

  **************************************************************************************
  constructor(private http: HttpClient, private configS: ConfigService);
  
  **************************************************************************************

  **************************************************************************************
  public getObsLoginUser(username: String, password: String);
  Restituisce un observable che se subscritto restituisce un oggetto JSON con lo User, ottenuto dal DB
  **************************************************************************************
  
  **************************************************************************************
  public createUser(id: String, adamant: number, user_id: number, start_time: number, stop_time: number, ip: String, token_id: String, refresh_token: String, _expirationDate: Date, active: number );
  Crea un oggetto User (ossia di tipo descritto dal modulo User), passandogli i dati che ottiene come parametri, e lo assegna alla variabile this.user
  
  **************************************************************************************

  **************************************************************************************
  public setLoggedUserData(data: any)
  Riceve in input un oggetto data, che contiene i dati dello User, e li assegna alla variabile this.user, e poi li salva in localStorage, sotto la chiave 'user'

  **************************************************************************************

  **************************************************************************************
  public logUserOBS(username: String, password: String);
  Restituisce un observable che se subscritto avvia la login e se questa va a buon fine, restituisce un oggetto JSON con lo User, ottenuto dal DB

  **************************************************************************************

  **************************************************************************************
  public logUser(username: String, password: String);
  avvia la login e se questa va a buon fine, restituisce un oggetto JSON con lo User, ottenuto dal DB
  **************************************************************************************

  **************************************************************************************
  public getLoggedUser();
  Restituisce l'oggetto User, partendo dai dati salvati in localStorage, sotto la chiave 'user' e ricostruendo l'ogetto del modello User
  **************************************************************************************

  **************************************************************************************
  public logout();
  Effettua il logout, cancellando i dati salvati in localStorage, sotto la chiave 'user'

  **************************************************************************************

  **************************************************************************************
  public isLogged();
  Restituisce true se l'utente è loggato, false altrimenti
  **************************************************************************************

  **************************************************************************************
  public tokenOfLogged()
  Restituisce il token dell'utente loggato, se l'utente non è loggato restituisce null

  **************************************************************************************

  
}
*/
export class AuthService {
  user: User | undefined;
  constructor(private http: HttpClient, private configS: ConfigService) 
  { 
    
  }

  public getObsRefreshUser(user_id: any, token_id: any, refresh_token: any)
  {
    let params = {
      "action" : this.configS.api_actions.refresh_user,
      "user_id": user_id,
      "token_id": token_id,
      "refresh_token": refresh_token
    }    
    return this.http.post(this.configS.api_url, params, { responseType: 'json' }   );
  }


  public RefreshUser(user_id: any, token_id: any, refresh_token: any)
  {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", this.configS.api_url, false ); // false for synchronous request
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.send(JSON.stringify({
      "action" : this.configS.api_actions.refresh_user,
      "user_id": user_id,
      "token_id": token_id,
      "refresh_token": refresh_token
    }));
    alert(xmlHttp.responseText);
    // let obs = this.getObsRefreshUser(user_id, token_id, refresh_token)
    // obs.subscribe((data: any) => 
    // {      
    //   if (data!=null)
    //   {                        
    //     this.createUser(data.id,
    //       data.adamant,
    //       data.user_id,
    //       data.start_time,        
    //       data.stop_time,
    //       data.ip,
    //       data.token_id,
    //       data.refresh_token,  
    //       data.expirationDate,              
    //       data.active);
    //     if (this.user!=null)
    //     {          
    //       localStorage.setItem('user', JSON.stringify(this.user));
    //     }
    //   }  
    // });
  }
      
  public getObsLoginUser(username: String, password: String)
  {
    let params = {
      "action" : this.configS.api_actions.log_user,
      "email": username,
      "password": password
    }    
    return this.http.post(this.configS.api_url, params, { responseType: 'json' }   );
  }
      
  public createUser(id: String, adamant: number, user_id: number, start_time: number, stop_time: number, ip: String, token_id: String, refresh_token: String, _expirationDate: Date, active: number, userData: any )
  {        
    _expirationDate = new Date(_expirationDate);
    this.user = new User(id, adamant, user_id, start_time, ip, token_id, refresh_token, _expirationDate, active, userData);
  }
  
  
  public setLoggedUserData(data: any)
  {
    if (data!=null)
      {                        
        this.createUser(data.id,
          data.adamant,
          data.user_id,
          data.start_time,        
          data.stop_time,
          data.ip,
          data.token_id,
          data.refresh_token,  
          data.expirationDate,              
          data.active,
          data.userData);
        if (this.user!=null)
        {          
          localStorage.setItem('user', JSON.stringify(this.user));
        }
      }  
  }
  
  public logUserOBS(username: String, password: String)
  {
    return this.getObsLoginUser(username, password);
  }

  public logUser(username: String, password: String)
  {
    let obs = this.getObsLoginUser(username, password);
    obs.subscribe((data: any) => 
    {      
      
      if (data!=null)
      {                        
        this.createUser(data.id,
          data.adamant,
          data.user_id,
          data.start_time,        
          data.stop_time,
          data.ip,
          data.token_id,
          data.refresh_token,  
          data.expirationDate,              
          data.active,
          data.userData);
        if (this.user!=null)
        {          
          localStorage.setItem('user', JSON.stringify(this.user));
        }
      }  
    });
  }

 

  public getLoggedUser()
  {
    let res = null; 
   //localStorage.setItem('user', '{}');
    let tempUser = localStorage.getItem('user');
   
    if (tempUser!=null && tempUser!=undefined && tempUser!='')
    {
      tempUser = JSON.parse(tempUser);
   
      
      return new User((Object)(tempUser).id, (Object)(tempUser).adamant, (Object)(tempUser).user_id, (Object)(tempUser).start_time, (Object)(tempUser).ip, (Object)(tempUser).token_id, (Object)(tempUser).refresh_token, (Object)(tempUser)._expirationDate, (Object)(tempUser).active, (Object)(tempUser).userData);       
      
      // 
      
      // if (user.token==null || user.token==undefined || user.token=='')
      // {                
      //   if (user.refresh_token!=null && user.refresh_token!=undefined)
      //   {          
      //       return this.RefreshUser(user.id, user.oldToken, user.refresh_token);
      //   }
      // }
      //res = user;
    }  
    return res;
  }

  public logout()
  {
    //localStorage.removeItem('user');
    localStorage.setItem('user', '{}');
  }

  public isLogged()
  {
    let res = false;
    let tempUser = localStorage.getItem('user');
    if (tempUser!=null)
    {
      tempUser = JSON.parse(tempUser);      
      this.user = new User((Object)(tempUser).id, (Object)(tempUser).adamant, (Object)(tempUser).user_id, (Object)(tempUser).start_time, (Object)(tempUser).ip, (Object)(tempUser).token_id, (Object)(tempUser).refresh_token, (Object)(tempUser)._expirationDate, (Object)(tempUser).active, (Object)(tempUser).userData);   
      if (this.user.token!=null)
      {
        res = true;
      }
    }  
    return res; 
  }
  
  public tokenOfLogged()
  {
    let res = null;
    let tempUser = localStorage.getItem('user');
    if (tempUser!=null)
    {
      tempUser = JSON.parse(tempUser);      
      this.user = new User((Object)(tempUser).id, (Object)(tempUser).adamant, (Object)(tempUser).user_id, (Object)(tempUser).start_time, (Object)(tempUser).ip, (Object)(tempUser).token_id, (Object)(tempUser).refresh_token, (Object)(tempUser)._expirationDate, (Object)(tempUser).active, (Object)(tempUser).userData);   
      if (this.user.token!=null && this.user.token!=undefined)
      {
        alert("non caduto");
        res = this.user.token;
      }
    }  
    return res; 
  }

 
}
