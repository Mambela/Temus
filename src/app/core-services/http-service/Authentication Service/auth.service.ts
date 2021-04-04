import { TokenData } from './../../../data/models/supporting/token-model';
import { Router } from '@angular/router';

import { CompanyData } from '../../../data/models/business-user/company-model';
import { catchError, tap } from 'rxjs/operators';
import { STOREDCONSTANTS } from '../../../module/constants.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
 
interface iUserDataResponse{
  conta_id:number;
  created_at:Date;
  email:string;
  email_verified_at: Date;
  id:number;
  perfil_id:number;
  primeiro_nome:string;
  sexo:string;
  telefone:string;
  ultimo_nome:string;
  updated_at:Date;
  username:string;
}

interface IEmpresaData{
categoria_id: number;
created_at: Date;
description: string;
designacao: string;
email: string;
id: number
localizacao_id: number
logo: string;
referencia: string;
telefone: string;
telefone_2: string;
tipo_id: number;
updated_at: Date;
user_id: number;
website: string;
}

interface iTokenStructure{
  token_type:string;
  expires_in:number;
  access_token:string;
  refresh_token:string;
}

interface AuthResponseData{
  conta:string;
  perfil:string;
  sucess:boolean;
  tokenData:iTokenStructure;
  userData:iUserDataResponse;
}

interface AuthEmpresaResponseData{
  success:boolean;
  perfil:string;
  empresaData:CompanyData;
  tokenData:iTokenStructure;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  businessAccountType:number = 2;
  userProfile = 2;

  localStorageCompany:string='companyData';
  localStorageToken:string = 'tokenData';


  companyDataSubj = new BehaviorSubject<CompanyData>(null);
  tokenDataSubj = new BehaviorSubject<TokenData>(null);

  companyDetails:CompanyData;
  tokenDetails:iTokenStructure;


  constructor(private http:HttpClient,private storedValues:STOREDCONSTANTS, private router:Router) { }

  userSignUp(name:string,email:string,password:string,password_confirmation:string,phone1:number,
             phone2:number=0,web:string,provinciaId:number,municipalityId:number,bairroId:number,ruaId:number,categoria:number,tipo:number,lat:number,lng:number,imgFile:File)
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
    formData.append('conta',this.businessAccountType.toString());
    formData.append('perfil',this.userProfile.toString());
    formData.append('categoria',categoria.toString());
    formData.append('tipo',tipo.toString());
    formData.append('lng',lng.toString());
    formData.append('lat',lat.toString());
    formData.append('provincia_id',provinciaId.toString());
    formData.append('municipio_id',municipalityId.toString());
    formData.append('comuna_id',bairroId.toString());
    formData.append('rua_Id',ruaId.toString());
    

    console.log(`provinciaId`, provinciaId);
    console.log(`municipio_id`, municipalityId);
    console.log(`comuna_id`, bairroId);
    console.log(`rua`, ruaId);

  

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
 
    try{
          return this.http.post<AuthEmpresaResponseData>(this.storedValues.BASEURL() + "user-login",formData
             
           ).pipe(
             catchError((errorRes)=>{
               console.log(errorRes);
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
            
            console.log("User Data =>",respdata.empresaData);
            console.log("Token Data =>",respdata.tokenData);
            console.log("/n/n",respdata);

 
         
            
            this.tokenDetails = respdata.tokenData;
            this.companyDetails = respdata.empresaData;

           this.handleAuthentication(this.companyDetails,this.tokenDetails);
            
            
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

     if(companyData != null || companyData != undefined){
       
      console.log("Company data",companyData);
      console.log("COmpany ID",companyData.id);

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
  
       

      if(companyData.id != null)
      {
       
        this.storedValues.userToken = tokenData.access_token;
        this.companyDataSubj.next(loadedCompany);
        this.tokenDataSubj.next(loadedToken);
            // this.router.navigate(['/business-dashboard']);

        // alert(companyData.)

        this.router.navigate(['/business-dashboard']);
        //this.router.navigate(['/business-dashboard']);

       
        //this.router.navigate(['/pesquisa']);  

      }
      else
      {
        // this.router.navigate(['']);
        //  this.router.navigate(['pesquisa/servico']);
        //  this.router.navigate(['pesquisa/local']);
        //this.router.navigate(['explorarMapa']);
        this.router.navigate(['/business-registration']);

      }
      
    }
      
      

    
 
  }



}
