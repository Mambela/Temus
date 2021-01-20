
import { CategoriaDataServiceService } from './../../DataService/categoria/categoria-data-service.service';
import { catchError, tap } from 'rxjs/operators';
import { STOREDCONSTANTS } from './../../../module/constants.service';
import { HttpClient } from '@angular/common/http';
import { BasicModel } from './../../../data/models/supporting/basic-model.model';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Console } from 'console';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  constructor(private storedConstants:STOREDCONSTANTS,private http:HttpClient,
              private categoriaDTService:CategoriaDataServiceService) { }

  //#region Categoria
  //#region Produto Categoria
  getProductCategoria(){
      
    // console.log("TOKEN INSIDE TGHE PRODUCT SERVICE",this.storedConstants.userToken);
 
     return this.http.get<BasicModel[]>(this.storedConstants.BASEURL()+"produto-categorias",{
       headers:{"Accept":"application/json","Authorization":"Bearer "+this.storedConstants.userToken}
     }).pipe(
       catchError((error)=>{
         return throwError(error)
       }),tap((produtoCategoria:BasicModel[])=>{
         
         
         this.categoriaDTService.setProdutoCategoria(produtoCategoria['data']);
   
       })
     );
   }

  //#endregion

  //#region Servicos Categoria
  
  //#endregion
    getServiceCategoria()
    {
      return  this.http.get<BasicModel[]>(this.storedConstants.BASEURL() + "servico-categorias",
      {
        headers:{"Accept":"application/json","Authorization":"Bearer "+this.storedConstants.userToken}
      }).pipe(
        catchError((error)=>{
          return throwError(error);
  
        }),tap((categoriaData:BasicModel[])=>{
              
            console.log(categoriaData['data']);
            this.categoriaDTService.setServicoCategoria(categoriaData['data']);
        })
      )
    }
     
  //#region Evento Categoria
  
  //#endregion

  //#region Local Categoria
  getLocalsCategoria(){

    return this.http.get<BasicModel[]>(this.storedConstants.BASEURL() + 'local-categorias',
        
      {headers:{"Accept": "application/json"}

      },).pipe(catchError(error=>{
        console.log('locals Error',error);

        return throwError(error);
          }),tap((categoriaResponse:BasicModel[])=>{
       

          console.log(categoriaResponse['data']);
          this.categoriaDTService.setLocalCategorias(categoriaResponse['data']);
            
        })
    );
    }
  //#endregion
  
    

  

   
  //#region SubCategoria
  getServiceTypeByCategory(categoriaID:number){


    return this.http.get<BasicModel[]>(this.storedConstants.BASEURL() + "servico-tipo-by-categoria/" + categoriaID,
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

  getProdutoTipoByCategoria(categoriaID:number)
  {

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

  
  getLocalTipoByCategoria(categoriaID:number)
  {

    return this.http.get<BasicModel[]>(this.storedConstants.BASEURL() + "local-tipos-by-categoria/" + categoriaID,
            {
              headers:{"Accept":"application/json","Authorization":"Bearer "+this.storedConstants.userToken}
            }).pipe(
              catchError((error)=>{
                return throwError(error);
              }),tap((tipoData:BasicModel[])=>{

              })
            );

  } 
  //#endregion


  //#region Address Categoria

  getMunicipios()
  {
    return this.http.get<BasicModel[]>(this.storedConstants.BASEURL() + "municipios",
    {
      headers:{"Accept":"Application/json","Authorization":"Bearer "+this.storedConstants.userToken}
    }).pipe(
      catchError((error)=>{
        return throwError(error);
      }),tap((municipios:BasicModel[])=>{
      
        console.log(municipios['data']);
        this.categoriaDTService.setMunicipio(municipios['data']);

      })
    );

  }

  getBairrosByMunicipios(categoriaID)
  {
    return this.http.get<BasicModel[]>(this.storedConstants.BASEURL() + "comunas-by-municipio/" +categoriaID,
    {
      headers:{"Accept":"Application/json","Authorization":"Bearer "+this.storedConstants.userToken}
    }).pipe(
      catchError((error)=>{
        return throwError(error);
      }),tap((bairros:BasicModel[])=>{

        console.log(bairros);
      })
    );

  }


  //#endregion

}
