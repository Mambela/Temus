import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatasharingService {

  companyName =  new BehaviorSubject(null);
  
  

  constructor() { }
  

  setCompanyName(companyName:string)
  {
      
      this.companyName.next(companyName);
  }

   

}
