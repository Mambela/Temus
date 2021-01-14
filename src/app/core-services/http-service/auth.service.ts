import { Router } from '@angular/router';
import { TokenData } from './../../data/models/supporting/token-model';
import { CompanyData } from './../../data/models/business-user/company-model';
import { catchError, tap } from 'rxjs/operators';
import { STOREDCONSTANTS } from './../../module/constants.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
 

interface AuthResponseData{
  sucess:boolean;
  perfil:string;
  empresaData:CompanyData;
  tokenData:iTokenStructure;
}

interface iTokenStructure{
  token_type:string;
  expires_in:number;
  access_token:string;
  refresh_token:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  businessAccountType:string = "Empresa";
  userProfile = "gratis";

  localStorageCompany:string='companyData';
  localStorageToken:string = 'tokenData';


  companyDataSubj = new BehaviorSubject<CompanyData>(null);
  tokenDataSubj = new BehaviorSubject<TokenData>(null);

  companyDetails:CompanyData;
  tokenDetails:iTokenStructure;


  constructor(private http:HttpClient,private storedValues:STOREDCONSTANTS, private router:Router) { }

  userSignUp(name:string,email:string,password:string,password_confirmation:string,phone1:number,
             phone2:number,web:string,locationId:number,categoria:number,lat:number,lng:number,imgFile:File)
  {


    
    let formData = new FormData();
    
    formData.append('name',name);
    formData.append('email',email);
    formData.append('password',password);
    formData.append('password_confirmation',password_confirmation);
    formData.append('phone1',phone1.toString());
    formData.append('phone2',phone2.toString());
    formData.append('web',web);
    formData.append('logo',imgFile,imgFile.name);
    formData.append('localizacao',locationId.toString());
    formData.append('conta',this.businessAccountType);
    formData.append('perfil',this.userProfile);
    formData.append('categoria',categoria.toString());
    formData.append('lng',lng.toString());
    formData.append('lat',lat.toString());
  

    return this.http.post(this.storedValues.BASEURL()+"register-business",formData,{
        headers:{"Accept":"application/json"},
        observe:'events',
        reportProgress:true 
    }).pipe(catchError((error)=>{
          return throwError(error);
      }),tap((event)=>{

      })
    );


  }

  userSingIn(setUsername:string,setPassword:string)
  {
    let formData = new FormData();
  
    formData.append('username',setUsername);
    formData.append('password',setPassword);
 // {
              //   username:setUsername,
              //   password:setPassword
              // }
    try{
          return this.http.post<AuthResponseData>(this.storedValues.BASEURL() + "login",formData
             
           ).pipe(
             catchError((errorRes)=>{
            let errorMessage = 'Occorreu um erro';
            if(!errorRes.error || !errorRes.error.error){
                return throwError(errorMessage);
            }
            switch (errorRes.error.error) {
                case 'invalid_credentials':
                  errorMessage = 'As credenciais do usuário incorretas.';
                  break;
            }
            return throwError(errorMessage);
          }),tap((respdata) =>{
            
            console.log("testing response ",respdata.sucess,respdata)

            this.companyDetails = respdata.empresaData[0];
            this.tokenDetails = respdata.tokenData;

            this.handleAuthentication(this.companyDetails,this.tokenDetails)
            
            
            console.log("Description ",this.companyDetails.referencia);

            })
          );
    }
    catch(error)
    {
  
    }

  }
  
  signOut(){
    this.companyDataSubj.next(null);
    this.tokenDataSubj.next(null);
     
    
    localStorage.clear();
    

    this.router.navigate(['/business']);

    
  }

  private handleAuthentication(companyDetails:CompanyData,tokenDetails:iTokenStructure)
  {
    
    
    /**
     * This handles the details of a company.
     * The reponse we are getting has two arrays on it the Company details and the Token details. 
     */ 
    const Company  = new CompanyData(companyDetails.id,companyDetails.designacao,companyDetails.referencia,
                              companyDetails.website,companyDetails.user_id,companyDetails.localizacao_id,
                              companyDetails.logo,companyDetails.categoria_id,companyDetails.tipo_id,
                              companyDetails.telefone,companyDetails.description,companyDetails.email,companyDetails.telefone_2);

    
                              console.log("Access token ",tokenDetails.access_token);

    /**
     * Create a new expiration date that will be handled in the application 
     * */ 
    const expirationDate = new Date(new Date().getTime() + tokenDetails.expires_in * 10000); 
    
    
    this.storedValues.userToken = tokenDetails.access_token;

    /**
     * Handle the token information that comes with the resonse of the data that you are currenty receinving from the server. 
     * */ 
    const Token = new TokenData(tokenDetails.token_type,expirationDate,tokenDetails.access_token,tokenDetails.refresh_token);                           

    this.companyDataSubj.next(Company);
    this.tokenDataSubj.next(Token);

    this.storedValues.userToken = tokenDetails.access_token;
    this.storedValues.userId = companyDetails.id;

    localStorage.setItem(this.localStorageCompany,JSON.stringify(Company));
    localStorage.setItem(this.localStorageToken,JSON.stringify(Token));
  
    
  }

  
  autoLoginBusiness()
  {
     // retrieve data from the Local Storage

     const companyData:CompanyData = JSON.parse(localStorage.getItem(this.localStorageCompany));
     const tokenData:iTokenStructure= JSON.parse(localStorage.getItem(this.localStorageToken));
      
    

    this.storedValues.userToken = tokenData.access_token;
    this.storedValues.userId = companyData.id;
      
     if(!companyData || !tokenData)
     {
       return;
     }

      const loadedCompany = new CompanyData(companyData.id,companyData.designacao,companyData.referencia,companyData.website,companyData.user_id
          ,companyData.localizacao_id,companyData.logo,companyData.categoria_id,companyData.tipo_id,companyData.telefone,companyData.description,companyData.email,companyData.telefone_2);

          const expirationDate = new Date(new Date().getTime() + tokenData.expires_in * 10000);      

          const loadedToken = new TokenData(tokenData.token_type,expirationDate,tokenData.access_token,tokenData.refresh_token);
  
       

      if(companyData.id)
      {
       
        this.storedValues.userToken = tokenData.access_token;
        this.companyDataSubj.next(loadedCompany);
        this.tokenDataSubj.next(loadedToken);
            // this.router.navigate(['/business-dashboard']);

        // alert(companyData.)

        //this.router.navigate(['/business-dashboard']);
        //this.router.navigate(['/business-dashboard']);
        this.router.navigate(['/pesquisa']);

        
         
      }
 
  }



}
