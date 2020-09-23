import { TokenData } from './../../data/models/supporting/token-model';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { STOREDCONSTANTS } from './../../module/constants.service';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { throwError, Subscription, BehaviorSubject } from 'rxjs';
 

@Injectable({
  providedIn: 'root'
})
export class CompanyService implements OnDestroy {

  tokenSubscr:Subscription;
  produtoCountSubj= new BehaviorSubject<number>(0);
  serviceCountSubj= new BehaviorSubject<number>(0);
  eventCountSubj= new BehaviorSubject<number>(0);

  tokenDT:TokenData;
      

  constructor(private http:HttpClient,private storedValues:STOREDCONSTANTS,
              private authservice:AuthService) {

                this.getrequiredData();

               }




  getDetails()
  {

    // console.log(this.tokenDT.access_token);

    return this.http.get(this.storedValues.BASEURL()+"empresa-content-info/"+this.storedValues.userId,
    {
      headers:{"Accept":"application/json","Authorization":"Bearer "+this.tokenDT.access_token}
    }).pipe(catchError(error=>{

          return throwError(error);

        }),tap((companyData)=>{
          
     
          this.produtoCountSubj.next(companyData[0].productCount);
          this.serviceCountSubj.next(companyData[0].serviceCount);
          this.eventCountSubj.next(companyData[0].eventCount);
          


        })
    );

  }
  
  getProfileProgress()
  {

    return this.http.get(this.storedValues.BASEURL()+"perfil-progress/"+this.storedValues.userId,{
      headers:{"Accept":"application/json","Authorization":"Bearer "+this.tokenDT.access_token}
    }).pipe(catchError(error=>{

          return throwError(error);

        }),tap((respdata)=>{
          
          console.log("Response data",respdata);

        })
    );
  }




  /**
   * * We are getting the token here so that we can use it for the calls to the server.
   * */ 
  getrequiredData()
  {
              this.tokenSubscr = this.authservice.tokenDataSubj.subscribe((subRes:TokenData)=>{
            
                // console.log("\n\n\nChecking if token exists inside the company service ",subRes.access_token);  
                this.tokenDT = subRes;
              });

  }

  ngOnDestroy()
  {

    this.tokenSubscr.unsubscribe();

  }


   


}
