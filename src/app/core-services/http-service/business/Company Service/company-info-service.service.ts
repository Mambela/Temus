import { catchError, tap } from 'rxjs/operators';
import { AuthService } from '../../Authentication Service/auth.service';
import { STOREDCONSTANTS } from './../../../../module/constants.service';
import { HttpClient } from '@angular/common/http';
import { CompanyData } from './../../../../data/models/business-user/company-model';
import { TokenData } from './../../../../data/models/supporting/token-model';
import { Subscription, BehaviorSubject, throwError } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyInfoServiceService {

   tokenSubscr:Subscription;
  produtoCountSubj= new BehaviorSubject<number>(0);
  serviceCountSubj= new BehaviorSubject<number>(0);
  eventCountSubj= new BehaviorSubject<number>(0);

  tokenDT:TokenData;
  companyDetails:CompanyData;
  localStorageCompany:string='companyData';

  constructor(private http:HttpClient,private storedValues:STOREDCONSTANTS,
              private authservice:AuthService) {

                this.getrequiredData();

               }




  getDetails()
  {

    // console.log(this.tokenDT.access_token);

    return this.http.get(this.storedValues.BASEURL()+"empresa-content-info/"+this.storedValues.userId,
    {
      headers:{"Accept":"application/json","Authorization":"Bearer "+this.tokenDT._access_token}
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
      headers:{"Accept":"application/json","Authorization":"Bearer "+this.tokenDT._access_token}
    }).pipe(catchError(error=>{

          return throwError(error);

        }),tap((respdata)=>{
          
          console.log("Response data",respdata);

        })
    );
  }

    /**
     * Get the details of the Company 
     * */ 

  getCompanyCategory()
  {

    return this.http.get(this.storedValues.BASEURL()+"empresa-view-category/"+this.storedValues.userId,
      {headers:{"Accept":"application/json","Authorization":"Bearer "+this.storedValues.getTokenData()},}
      )
    .pipe(catchError(error =>{
      return throwError(error);
    }));


  }

  getCompanyAddress(){

    return this.http.get(this.storedValues.BASEURL()+"empresa-address/"+this.storedValues.userId,
     { headers:{"Accept":"application/json","Authorization":"Bearer "+this.storedValues.getTokenData()},}
    ).pipe(catchError(error =>{
        return throwError(error);
    }));

  }

  

  /**
   *  Update company Details from the Profile 
   * 
   */
  updateAccountDetails()
  {
    // return this.http.post()

  }

  updateCompanyData(email:string,name:string,website:string,phone1:number,phone2:number,description:string,uploadImage:File=null){

    
    console.log("Token ->",this.storedValues.getTokenData());

    let formData = new FormData();
    
    formData.append('email',email);
    formData.append('designacao',name);
    formData.append('website',website);
    formData.append('phone1',phone1.toString());
    formData.append('phone2',phone2.toString());
    formData.append('description',description);
    formData.append('__method','put');

    if(uploadImage != null)
    {
      formData.append('logo',uploadImage,uploadImage.name);  
    }
    
    return this.http.post(this.storedValues.BASEURL()+"empresa-update/"+this.storedValues.userId,formData,{
      headers:{"Accept":"application/json","Authorization":"Bearer "+this.storedValues.getTokenData()},
       
    }).pipe(catchError(error =>{


      return throwError(error);

    }),tap((responseData)=>{

      console.log(responseData['data']);

      

      this.updateCompanyLocalData(responseData['data']);

      })
    );

    

  }

  updateCompanyLocalData(companyDetails:CompanyData){
    
    const Company  = new CompanyData(companyDetails.id,companyDetails.designacao,companyDetails.referencia,
      companyDetails.website,companyDetails.user_id,companyDetails.localizacao_id,
      companyDetails.logo,companyDetails.categoria_id,companyDetails.tipo_id,
      companyDetails.telefone,companyDetails.description,companyDetails.email,companyDetails.telefone_2);


      localStorage.setItem(this.localStorageCompany,JSON.stringify(Company));

  }

  

  updateCompanyAddress(streetID:number){

    let method:string="_method=put";
    let formData = new FormData();
    formData.append("rua",streetID.toString());
    


    return this.http.post(this.storedValues.BASEURL()+"empresa-address/"+this.storedValues.userId+"?"+method,formData,{
      headers:{"Accept":"application/json","Authorization":"Bearer "+this.storedValues.getTokenData()}
    
    }).pipe(catchError(error =>{
      
      return throwError(error);

    }));

  }


  updateCompanyCategory_Sector()
  {

  }


  updateCompanyWorkingHours()
  {

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
