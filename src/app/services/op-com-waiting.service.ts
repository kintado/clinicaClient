import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpComWaitingService {

  constructor() { }

  public loadMedicinalsTableIdToUpInExecution: boolean = false;


  public loadMedicinalsTableIdToUp: number = -1;

  public mustRefresh: boolean = false;



  public user:any = null;
  

}
