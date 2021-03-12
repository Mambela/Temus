import { CategoriaDataServiceService } from '../../../DataService/categoria/categoria-data-service.service';
import { CategoriaProductService } from '../../../DataService/categoria/categoriaProductdata-service.service';

import { EmpresaProdutoModel } from '../../../../data/models/business-user/empresa-product.model';
import { EmpresaServicoModel } from '../../../../data/models/business-user/empresa-servico.model';
import { catchError, tap } from 'rxjs/operators';
import { BasicModel } from '../../../../data/models/supporting/basic-model.model';
import { STOREDCONSTANTS } from '../../../../module/constants.service';
import { Subscription, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'protractor';
import { relative } from 'path';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  tokenSubscr:Subscription;
  
  constructor(private http:HttpClient,private storedConstants:STOREDCONSTANTS,private prodDataService:CategoriaProductService,
              private categoriaDTService:CategoriaDataServiceService) { }

  getrequiredData()
  {
              // this.tokenSubscr = this.authservice.tokenDataSubj.subscribe((subRes:TokenData)=>{
            
              //   // console.log("\n\n\nChecking if token exists inside the company service ",subRes.access_token);  
              //   this.tokenDT = subRes;
              // });

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

  createNewProduct(name:string,description:string,categoria:number,tipo:number){

    return this.http.post(this.storedConstants.BASEURL()+'produto',
    {
      designacao: name,
      descricao: description,
      marca:'Marca',
      categoria_produto_id:categoria,
      tipo_produto_id: tipo
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
  
  prepareProductToSearch(searchTerm:string,categoria:number =null)
  {
        if(categoria ==null)
        {  
          console.log("Categoria null");
          return this.searchNoCategoria(searchTerm);

        }else{
          
          console.log("Categoria not null");
          return this.searchIncludeCategoria(searchTerm,categoria);
        }


  }

  associateProdutoToEmpresa(produtoId:number,availability:boolean,imageFile:File,price:number,description:string,stock:number,showPrice:boolean){
    
    let formData = new FormData();
    // Prepare the form to send 
    formData.append('acctId',this.storedConstants.userId.toString());
    formData.append('id',produtoId.toString());
    formData.append('preco',price.toString());
    formData.append('stock',stock.toString());
    formData.append('mostrarPrice',showPrice.toString())
    formData.append('disponibilidade',String(availability));
    formData.append('produto_id',produtoId.toString());
    formData.append('descricao',description);
    formData.append('imagem',imageFile,imageFile.name);
    
    // new Response(formData).text ().then(console.log);

    if(formData.has('imagem'))
    {
      // alert('Has Image');
      return this.http.post(this.storedConstants.BASEURL()+"empresa-produto",formData,
      {
        headers:{"Accept":"application/json","Authorization":"Bearer "+this.storedConstants.userToken},
        observe:'events',
        reportProgress:true 
      }
      ).pipe(catchError((error)=>{


        
            return throwError(error);
          }),tap((event)=>{
            // console.log(respdata);
            // return respdata;
            
            // if(event.type === HttpEventType.UploadProgress){
            //   console.log('Upload Progress: '+ Math.round(event.loaded / event.total * 100) + '%');
            // }
            // else if(event.type == HttpEventType.Response){
            //   console.log(event);
            // }

          })
      );
    }
    else{
      alert('No image provided');
    }
   
  }

  searchNoCategoria(searchTerm:string)
  {
      return this.http.get<BasicModel[]>(this.storedConstants.BASEURL()+"get-produto-parameter/"+searchTerm ,{
        headers:{"Accept":"application/json","Authorization":"Bearer "+this.storedConstants.userToken}
        }).pipe(catchError((error)=>{
          return throwError(error);
        }));
  }

  searchIncludeCategoria(searchTerm:string,categoria:number)
  {
    return this.http.get<BasicModel[]>(this.storedConstants.BASEURL()+"get-produto-parameter/"+searchTerm +"/"+categoria,{
      headers:{"Accept":"application/json","Authorization":"Bearer "+this.storedConstants.userToken}
      }).pipe(catchError((error)=>{
        return throwError(error);
      }));
  }

  updateEmpresaProduto(previousImage:string=null,imageFile:File=null,price:number,availability:boolean,produtoID:number,description:string,stock:number){
    
    let formData = new FormData();
    formData.append('acctId',this.storedConstants.userId.toString());
    formData.append('id',produtoID.toString());
    formData.append('preco',price.toString());
    formData.append('disponibilidade',String(availability));
    formData.append('produto_id',produtoID.toString());
    formData.append('descricao',description);
    formData.append('stock',stock.toString());
    formData.append('_method','put');
     

 
  
    
      if(imageFile)
      {
       
        formData.append('imagem',imageFile,imageFile.name);  
      }
      else{
        formData.append('oldimagem',previousImage);
      
      }

    return this.http.post(this.storedConstants.BASEURL() + "empresa-produto",
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

  removeProduto(produtoID:number){
    return this.http.delete(this.storedConstants.BASEURL() +"empresa-produto/"+produtoID,
      {
        headers:{"Accept":"application/json","Authorization":"Bearer "+this.storedConstants.userToken},
        observe:'events',
        reportProgress:true 
      }).pipe(catchError((error)=>{
          return throwError(error);
      }),tap((respdata)=>{
       
      })

      );
  }
  
}
