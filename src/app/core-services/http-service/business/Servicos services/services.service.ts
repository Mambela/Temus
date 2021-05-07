import { CategoriaDataServiceService } from '../../../DataService/categoria/categoria-data-service.service';
import { BasicModel } from '../../../../data/models/supporting/basic-model.model';
import { catchError, tap } from 'rxjs/operators';
import { EmpresaServicoModel } from '../../../../data/models/business-user/empresa-servico.model';
import { STOREDCONSTANTS } from '../../../../module/constants.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { CategoriaProductService } from '../../../DataService/categoria/categoriaProductdata-service.service';
import { Console } from 'console';

@Injectable({
  providedIn: 'root'
})
export class CompanyServicesService {

  constructor(private http:HttpClient,private storedConstants:STOREDCONSTANTS,
              private categoriaDTService:CategoriaDataServiceService) { }
  

  

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


  createNewService(name:string,description:string,categoria:number,tipo:number)
  {

    return this.http.post(this.storedConstants.BASEURL()+'servico',
    {
      designacao: name,
      descricao: description,
      marca:'Marca',
      categoria_servico_id:categoria,
      tipo_servico_id: tipo
    },
    {
      headers:{"Accept":"application/json","Authorization":"Bearer "+this.storedConstants.userToken}
    }).pipe(catchError((error)=>{
      return throwError (error);
        }),tap((respData)=>{
          
          return respData['data'];
          
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
  
  prepareProductToSearch(searchTerm:string,categoria:number =null)
  {
        if(categoria ==null)
        {  
          console.log("Categoria null");
          return this.searchWithNoCategory(searchTerm);

        }else{
          
          console.log("Categoria not null");
          return this.searchIncludeCategory(searchTerm,categoria);
        }

  }
  

  searchWithNoCategory(searchTerm){
    return this.http.get<BasicModel[]>(this.storedConstants.BASEURL()+"get-servico-parameter/"+searchTerm ,{
      headers:{"Accept":"application/json","Authorization":"Bearer "+this.storedConstants.userToken}
      }).pipe(catchError((error)=>{
        return throwError(error);
      }));
  
  }

  searchIncludeCategory(searchTerm,category){
    return this.http.get<BasicModel[]>(this.storedConstants.BASEURL()+"get-servico-parameter/"+searchTerm +"/"+category,{
      headers:{"Accept":"application/json","Authorization":"Bearer "+this.storedConstants.userToken}
      }).pipe(catchError((error)=>{
        return throwError(error);
      }));

  }

  associateServiceToEmpresa(servicoId:number,availability:boolean,imageFile:File,price:number,description:string,showPrice:number)
  {
    
   
    let formData = new FormData();
    // Prepare the form to send 
    formData.append('acctId',this.storedConstants.userId.toString());
    formData.append('id',servicoId.toString());
    formData.append('preco',price.toString());
    formData.append('disponibilidade',String(availability));
    formData.append('servico_id',servicoId.toString());
    formData.append('description',description);
    formData.append('imagem',imageFile,imageFile.name);
    formData.append('visualisar_pre',showPrice.toString());
    
    // new Response(formData).text ().then(console.log);

    if(formData.has('imagem'))
    {
      // alert('Has Image');
      return this.http.post(this.storedConstants.BASEURL()+"empresa-servico",formData,
      {
        headers:{"Accept":"application/json","Authorization":"Bearer "+this.storedConstants.userToken},
        observe:'events',
        reportProgress:true 
      }
      ).pipe(catchError((error)=>{
            return throwError(error);
          }),tap((event)=>{
    

          })
      );
    }
    else{
      alert('No image provided');
    }
   
    
  }
  

  updateEmpresaServico(previousImage:string=null,imageFile:File=null,price:number,availability:boolean,servicoID:number,description:string)
  {
    console.log(servicoID);
    let formData = new FormData();
    formData.append('acctId',this.storedConstants.userId.toString());
    formData.append('id',servicoID.toString());
    formData.append('preco',price.toString());
    formData.append('disponibilidade',String(availability));
    formData.append('servico_id',servicoID.toString());
    formData.append('description',description);
    formData.append('_method','put');
   
  
    
      if(imageFile)
      {
        formData.append('imagem',imageFile,imageFile.name);  
      }
      else{
        formData.append('oldimagem',previousImage);
      }

    return this.http.post(this.storedConstants.BASEURL() + "empresa-servico",
      formData
    ,{
      headers:{"Accept":"application/json","Authorization":"Bearer "+this.storedConstants.userToken},
      observe:'events',
      reportProgress:true 
    }).pipe(catchError((error)=>{
      return throwError(error);
    }),tap((respadata)=>{
        
      console.log(respadata);
      })
    );

  }

  removeServico(servicoID:number){

    return this.http.delete(this.storedConstants.BASEURL() +"empresa-servico/"+servicoID,
      {
        headers:{"Accept":"application/json","Authorization":"Bearer "+this.storedConstants.userToken},
        observe:'events',
        reportProgress:true 
      }).pipe(catchError((error)=>{
          return throwError(error);
      }),tap((respdata)=>{
        console.log(respdata)
      })

      );
  }

}
