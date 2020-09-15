import { catchError, tap } from 'rxjs/operators';
import { STOREDCONSTANTS } from './../../module/constants.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  businessAccountType:string = "Empresa";
  userProfile = "gratis";
  constructor(private http:HttpClient,private storedValues:STOREDCONSTANTS) { }

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

  userSingIn()
  {}
  

  userGetToken()
  {
    
  }


}
