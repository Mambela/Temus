import { UserAddress } from './../../../../data/models/regular-user/UserAddress.model';
import { streetModel } from '../../../../data/models/supporting/street-model.model';

import { catchError, tap } from 'rxjs/operators';
import { BasicModel } from '../../../../data/models/supporting/basic-model.model';
import { STOREDCONSTANTS } from '../../../../module/constants.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressesService {

  constructor(private CONSTANTS:STOREDCONSTANTS, private http:HttpClient) { }

  getPronvinces()
  {
    return this.http.get<BasicModel[]>(this.CONSTANTS.BASEURL() + "provincias",
    {headers:{"Accept": "application/json"}
      },).pipe(catchError(error=>{
        console.log('pronvicias Error',error);
        return throwError(error);
      }),tap((provincias:BasicModel[])=>{
        
        
        })
      );
  }

  getMunicipalities(idProvincia:number){
    
    return this.http.get<BasicModel[]>(this.CONSTANTS.BASEURL() +'municipios-by-provincia/'+idProvincia,
                {
                  headers:{"Accept":"application/json"}
                })
                .pipe(
                  catchError((errorMunici)=>{
                    console.log(errorMunici);
                    return throwError(errorMunici);
                  }), tap((municipioData:BasicModel[])=>{
                        
                
                  })
                );
  }

  getNeighbourhood(idMunicipio:number){


    return this.http.get<BasicModel[]>(this.CONSTANTS.BASEURL() + 'comunas-by-municipio/'+idMunicipio,
                  {
                    headers:{"Accept":"application/json"}
                  })
                  .pipe(
                    catchError((errorBairro)=>{
                        
                      console.log(errorBairro,'Bairro Error');
                      return throwError(errorBairro);
                    }), tap((dataBairro:BasicModel[])=>{
                      
                      

                    })
                  );
  }

  getStreetsbyNeighbourhood(idComuna:number,term:string)
  {
    return this.http.get<streetModel[]>(this.CONSTANTS.BASEURL() + "localizacao-rua-by-comuna/" + idComuna+"/"+term,
    {
      headers:{"Accept":"application/json"}          
    }).pipe(
      catchError((error)=>{
          
        return throwError(error);
      }),
      tap((Ruas:streetModel[])=>{
        

        console.log(Ruas);
      })
      
    );
  }
  
  getUserAddress(lat:number,lng:number)
  {
        return this.http.get<UserAddress>(this.CONSTANTS.BASEURL() + "userCurrentAddress/" + lat+"/"+lng,
        {
          headers:{"Accept":"application/json"}
        }).pipe(
          catchError((error)=>{
            return throwError(error);
          }), tap((Address:UserAddress)=>{
            
              console.log(Address);

          })
        )
  }

}
