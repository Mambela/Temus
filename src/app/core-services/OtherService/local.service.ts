import { UserComment } from '../../data/models/regular-user/UserComment.model';
import { ResultItemLocal } from 'src/app/data/models/regular-user/resultItemLocal.model';
import { catchError, tap } from 'rxjs/operators';
import { ItemLocal } from './../../data/models/regular-user/ItemLocal.model';
import { STOREDCONSTANTS } from './../../module/constants.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pipe, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor(private storedConstants:STOREDCONSTANTS,private http:HttpClient) { }

  getLocalData(localId:number)
  {
    return this.http.get<ItemLocal>(this.storedConstants.BASEURL()+"local/"+localId,
    {
      headers:{"Accept":"application/json","Authorization":"Bearer "+this.storedConstants.userToken}
    }).pipe(
      catchError((error)=>{
        return throwError(error);
        }),tap((local:ItemLocal)=>{
              
        })
        );
  }

  getLocalsCloseby(id:number,lat:string,lng:string)
  {
    return this.http.get<ResultItemLocal[]>(this.storedConstants.BASEURL()+"getlocalsnexttolocal/"+id+"/"+lat+"/"+lng,
    {
      headers:{"Accept":"application/json","Authorization":"Bearer "+this.storedConstants.userToken}
    }).pipe(
      catchError((error)=>{
        return throwError(error);
      }),tap((local:ResultItemLocal[])=>{

      })
    );
  }

  getLocalComments(id:number)
  {

    return this.http.get<UserComment[]>(this.storedConstants.BASEURL()+"avaliar-local/"+id,
    {
      headers:{"Accept":"application/json"}
    }).pipe(
      catchError((error)=>{
        return throwError(error);
      }),tap((comment:UserComment[])=>{

      })
    );
  }

  getLocalAddress(id:number)
  {
      return this.http.get(this.storedConstants.BASEURL()+"getLocalAddress/"+id,
      {
        headers:{"Accept":"application/json"}
      }).pipe(
        catchError((error) =>{
          return throwError(error);
        })
      );
  }

  postNewComment(coment:string,local_id:number,rating:number)
  {

    return this.http.post(this.storedConstants.BASEURL()+"avaliar-local",
    {
      comment:coment,
      local_id:local_id,
      rating:rating,
      user_id:this.storedConstants.userId
    },
    {
      headers:{"Accept":"application/json","Authorization":"Bearer "+this.storedConstants.userToken}

    }).pipe(
      catchError((error)=>{
        return throwError(error);
      }),tap((response)=>{


      })
    );

  }
  

  getSimilarLocation(categoriaId:number,localId:number,numbCount:number)
  {

    return this.http.get<ResultItemLocal[]>(this.storedConstants.BASEURL()+"similarlocals/"+categoriaId+"/"+localId+"/"+numbCount,
    {
      headers:{"Accept":"application/json"}
    }).pipe(
      catchError((error)=>{
        return throwError(error);
      }),tap((local:ResultItemLocal[])=>{

      })
    );

  }

}
