import { EmpresaProdutoModel } from './../../../data/models/business-user/empresa-product.model';
import { EmpresaServicoModel } from './../../../data/models/business-user/empresa-servico.model';
import { catchError, tap } from 'rxjs/operators';
import { BasicModel } from './../../../data/models/supporting/basic-model.model';
import { STOREDCONSTANTS } from './../../../module/constants.service';
import { Subscription, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'protractor';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  tokenSubscr:Subscription;
  
  constructor(private http:HttpClient,private storedConstants:STOREDCONSTANTS) { }

  getrequiredData()
  {
              // this.tokenSubscr = this.authservice.tokenDataSubj.subscribe((subRes:TokenData)=>{
            
              //   // console.log("\n\n\nChecking if token exists inside the company service ",subRes.access_token);  
              //   this.tokenDT = subRes;
              // });

  }


  getProductCategoria(){
      
   // console.log("TOKEN INSIDE TGHE PRODUCT SERVICE",this.storedConstants.userToken);

    return this.http.get<BasicModel[]>(this.storedConstants.BASEURL()+"produto-categorias",{
      headers:{"Accept":"application/json","Authorization":"Bearer "+this.storedConstants.userToken}
    }).pipe(
      catchError((error)=>{
        return throwError(error)
      }),tap((produtoCategoria:BasicModel[])=>{
        

      })
    );
  }

  getProdutoTipoByCategoria(categoriaID:number)
  {

    return this.http.get<BasicModel[]>(this.storedConstants.BASEURL() + "produto-tipo-by-categoria/" + categoriaID,
          {
            headers:{"Accept":"application/json","Authorization":"Bearer "+this.storedConstants.userToken}   
          }).pipe(
            catchError((error)=>{
            return throwError(error);
            }),tap((tipoData:BasicModel[])=>{

               
            })
            
          );

  }
  
  getCompanyProductsByChoice(choice:string,paramID:number)
  {
    return this.http.get<EmpresaProdutoModel[]>(this.storedConstants.BASEURL()+"empresa-produtos/"+this.storedConstants.userId +"/"+paramID+"/"+choice,
    {
      headers:{"Accept":"application/json","Authorization":"Bearer "+this.storedConstants.userToken}
    }).pipe(catchError((error)=>{

      return throwError(error);
    }),tap((productResp:EmpresaProdutoModel[])=>{
        
      console.log(productResp);
    })
    );

  }

  getAllCompanyProducts()
  {
     return this.http.get<EmpresaProdutoModel[]>(this.storedConstants.BASEURL()+"empresa-produtos/"+this.storedConstants.userId,
      {
        headers:{"Accept":"application/json","Authorization":"Bearer "+this.storedConstants.userToken}

      }).pipe(catchError((error)=>{
        return throwError(error);
      }),tap((productResp:EmpresaProdutoModel[])=>{
        
        console.log(productResp);

      })
      );
  }


}
