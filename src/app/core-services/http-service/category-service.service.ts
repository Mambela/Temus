import { CategoriadataService } from './../DataService/categoria/categoriadata-service.service';
import { BasicModel } from './../../data/models/supporting/basic-model.model';
import { STOREDCONSTANTS } from './../../module/constants.service';
import { Injectable } from '@angular/core';
import { catchError, tap, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private storedValues:STOREDCONSTANTS,private http:HttpClient,private categoriaDataService : CategoriadataService) { }

  // constructor(private storedValues:STOREDCONSTANTS,private http:HttpClient) { }


  
  getLocalsCategoria(){

    return this.http.get<BasicModel[]>(this.storedValues.BASEURL() + 'local-categorias',
        
      {headers:{"Accept": "application/json"}

      },).pipe(catchError(error=>{
        console.log('locals Error',error);
        return throwError(error);
          }),tap((categoriaResponse:BasicModel[])=>{
       
           this.categoriaDataService.setCategoriaDetail(categoriaResponse['data']);
            
        })
      
    );

  }

  searchCategoria(term:any)
  {
    

    return this.http.get<BasicModel[]>(this.storedValues.BASEURL() + 'getEmpresaCategoria/' + term,
      
      {headers:{"Accept": "application/json"}
      }).pipe( catchError(error=> {
        console.log('locals with param error',error);

        return throwError(error);
      }),tap((categoriaResponse:BasicModel[])=>{
        

        console.log(categoriaResponse);
      //  return categoriaResponse[0].designacao;
        
        
      })

    );
  }


}
