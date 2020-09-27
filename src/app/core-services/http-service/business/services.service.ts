import { BasicModel } from './../../../data/models/supporting/basic-model.model';
import { catchError, tap } from 'rxjs/operators';
import { EmpresaServicoModel } from './../../../data/models/business-user/empresa-servico.model';
import { STOREDCONSTANTS } from './../../../module/constants.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyServicesService {

  constructor(private http:HttpClient,private storedConstants:STOREDCONSTANTS) { }
  

  getServiceCategoria()
  {
    return  this.http.get<BasicModel[]>(this.storedConstants.BASEURL() + "servico-categorias",
    {
      headers:{"Accept":"application/json","Authorization":"Bearer "+this.storedConstants.userToken}
    }).pipe(
      catchError((error)=>{
        return throwError(error);

      }),tap((categoriaData:BasicModel[])=>{
                    
          console.log(categoriaData);
      })
    )
  }

  getServiceType(categoriaId:number)
  {
    return this.http.get<BasicModel[]>(this.storedConstants.BASEURL() + "servico-tipo-by-categoria/" +categoriaId,
                     {
                       headers:{"Accept":"application/json","Authorization":"Bearer "+this.storedConstants.userToken}   
                     }).pipe(
                       catchError((error)=>{
                         return throwError(error);
                     }),tap((categoriData:BasicModel[])=>{
                         
                     })
                   );
  }

  getServiceTypeByCategory(categoriaID:number){


    return this.http.get<BasicModel[]>(this.storedConstants.BASEURL() + "produto-tipo-by-categoria/" + categoriaID,
    {
      headers:{"Accept":"application/json","Authorization":"Bearer "+this.storedConstants.userToken}   
    }).pipe(
      catchError((error)=>{
      return throwError(error);
      }),tap((tipoData:BasicModel[])=>{

           console.log(tipoData);
      })
      
    );
  }

  getCompanyServicesByChoice(paramID:number,choice:string){

    return this.http.get<EmpresaServicoModel[]>(this.storedConstants.BASEURL()+"empresa-servicos/"+this.storedConstants.userId +"/"+paramID+"/"+choice,
    {
      headers:{"Accept":"application/json","Authorization":"Bearer "+this.storedConstants.userToken}
            }).pipe(catchError((error)=>{ 
              return throwError(error);
            }),tap((respdata:EmpresaServicoModel[])=>{  
                   
            })
        );

  }


  getAllCompanyServices()
  {
    return this.http.get<EmpresaServicoModel[]>(this.storedConstants.BASEURL()+"empresa-servicos/"+this.storedConstants.userId,{
      headers:{"Accept":"application/json","Authorization":"Bearer "+this.storedConstants.userToken}
    }).pipe(catchError((error)=>{
        return throwError(error);
    }),tap((respServices:EmpresaServicoModel[])=>{
        
          console.log(respServices);
      })
    );


  }
  


}
