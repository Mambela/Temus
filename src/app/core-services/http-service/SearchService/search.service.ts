import { SearchResultDataService } from './../../DataService/SearchResult/search-result-data.service';
import { ResultItemServico } from './../../../data/models/regular-user/resultItemServico.model';

import { catchError, tap } from 'rxjs/operators';
import { STOREDCONSTANTS } from './../../../module/constants.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { ResultItemLocal } from 'src/app/data/models/regular-user/resultItemLocal.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private storedConstants: STOREDCONSTANTS, private http:HttpClient, private searchResult:SearchResultDataService) { }



  searchServico(name:string = "",prestador:string ="",categoria:string="",tipo:string = "",provincia:string ="",municipio:string ="",bairro:string="")
  {
    console.log("inside The method");
    return this.http.get<ResultItemServico[]>(this.storedConstants.BASEURL() +"searchServico?"+"name="+name+"&prestador="+prestador+"&categoria="+categoria+"&tipo="+tipo+"&provincia="+provincia+"&municipio="+municipio+"&bairro="+bairro,
    {headers:{"Accept":"application/json"}},
    ).pipe(catchError(error=>{
      return throwError(error)
    }),
      tap((respdData:ResultItemServico[])=>{

        this.searchResult.setServicoResult(respdData['data']);

      })
    );
  }
  
  servicoPage(pageNumber:number)
  {
    return this.http.get<ResultItemServico[]>(this.storedConstants.BASEURL()+"searchServico?&page=" + pageNumber,
    {headers:{"Accept":"application/json"}},
    ).pipe(catchError(error =>{
     return throwError(error) 
    }),
    tap((respData:ResultItemServico[])=>{

      this.searchResult.setServicoResult(respData['data']);
      })
    );

  }


  searchProduct(name:string = "",fornecedor:string ="",categoria:string ="",tipo:string ="",provincia:string ="",municipio:string ="",bairro:string ="")
  {
      
    return this.http.get<ResultItemServico[]>(this.storedConstants.BASEURL() + "searchProduto?name=" +name+"&fornecedor="+fornecedor+"&categoria="+categoria+"&tipo="+tipo+"&provincia="+provincia+"&municipio="+municipio+"&bairro="+bairro,
    {headers:{"Accept":"application/json"}},
    ).pipe(catchError(error=>{
      return throwError(error)
    }),tap((respData:ResultItemServico[])=>{
      
      console.log(respData);
       this.searchResult.setProdutoResult(respData['data']);
      })
    );
    
      
  }

  productPage(pageNumber:number)
  {
    return this.http.get<ResultItemServico[]>(this.storedConstants.BASEURL() + "searchProduto?&page="+pageNumber,
    {headers:{"Accept":"application/json"}},
    ).pipe(catchError(error=>{
      return throwError(error)
    }),tap((respData:ResultItemServico[])=>{
      
       this.searchResult.setProdutoResult(respData['data']);
      })
    );
  }

  searchLocal(name:string = "",categoria:string ="",tipo:string ="",provincia:string ="",municipio:string ="",bairro:string ="")
  {
    return this.http.get<ResultItemLocal[]>(this.storedConstants.BASEURL() +"searchLocal?name="+name+"&categoria="+categoria+"&tipo="+tipo+"&provincia="+provincia+"&municipio="+municipio+"&bairro="+bairro,
    {headers:{"Accept" : "application/json"}},
    ).pipe(catchError(error =>{
      return throwError(error)
    }),tap((repsData:ResultItemLocal[])=>{
        
      this.searchResult.setLocalResult(repsData['data']);
      })
    );
  }



  localPage(pageNumber:number)
  {
    return this.http.get<ResultItemLocal[]>(this.storedConstants.BASEURL() + "searchLocal?&page="+pageNumber,
    {headers:{"Accept":"application/json"}},
    ).pipe(catchError(error=>{
      return throwError(error)
    }),tap((respData:ResultItemLocal[])=>{
      
       this.searchResult.setLocalResult(respData['data']);
      })
    );
  }

}
