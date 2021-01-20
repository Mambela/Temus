import { CategoriaDataServiceService } from './../../../../core-services/DataService/categoria/categoria-data-service.service';
import { CompanyInfoServiceService } from './../../../../core-services/http-service/business/Company Service/company-info-service.service';
import { HttpEventType } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { STOREDCONSTANTS } from './../../../../module/constants.service';
import { DialogboxComponent } from './../../../../sections/dialogbox/dialogbox.component';
import { AddNewProductServiceComponent } from '../../../../components/business-user/add-new-product-service/add-new-product-service.component';
import { NgbModal, NgbModalConfig, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpresaProdutoModel } from './../../../../data/models/business-user/empresa-product.model';
import { EmpresaServicoModel } from './../../../../data/models/business-user/empresa-servico.model';
import { BasicModel } from './../../../../data/models/supporting/basic-model.model';
import { ProductsService } from '../../../../core-services/http-service/business/Produto Services/products.service';

import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { CategoryService } from 'src/app/core-services/http-service/business/Category Services/category-service.service';
import { NgbModalBackdrop } from '@ng-bootstrap/ng-bootstrap/modal/modal-backdrop';
import { chownSync } from 'fs';

 

@Component({
  selector: 'app-business-products',
  templateUrl: './business-products.component.html',
  styleUrls: ['./business-products.component.scss']
})


export class BusinessProductsComponent implements OnInit, OnDestroy {
   


  _opened: boolean = true;
  _rightBarOpened: boolean = false;
  _docked: boolean = true;
  _Mode:string = 'push';
  
  isLoadingCategoria:boolean = false;
  isLoadingTipo:boolean = false;
  isLoadingProdutos = false;

  productCategoria:BasicModel[];
  listOfProducts:EmpresaServicoModel[];
  productTipo:BasicModel[];
  productCateriaSub:Subscription;

  serviceCategoria:BasicModel[];

  productCount:number;
  productCountSubscrip:Subscription;

  selectedCategoria:string="Categoria";
  selectedTipo:string="Tipo";

  

  /**
   * TO EDIT PRODUCT 
  */
 
 logoName:string;
  imagePath;
  imgURL: any="../../../../assets/images/placeholder.png";
  message: string;
  fileName:string='Choose file';
  uploadedFile:File=null;
  uploadingProgress:number;

  producttoEdit:EmpresaProdutoModel;
  productAvailable:boolean=false;
  prodAvailability:string="Indisponivel";

  priceDisplay:boolean =false;
  productPrice_availability:string="Ocultar ";
  


  uploadPercentage:number;
  uploadMessage:string;
  uploadMessageType:string;
  isUploadingServico:boolean;


  constructor(private companyService:CompanyInfoServiceService,private productService:ProductsService,private modalService:NgbModal,
              private categoriaDTService:CategoriaDataServiceService,private config:NgbModalConfig,private storedConstant:STOREDCONSTANTS) {
    this.getProductCount();
   }

  ngOnInit(): void {
      
    this.getProductCategoria();
    this.onLoadEmpresaProdutos();
  }

  getProductCount()
  {
    this.productCountSubscrip = this.companyService.produtoCountSubj.subscribe((productCount)=>{
        
      this.productCount = productCount;

    });

  }

  
  onLoadEmpresaProdutos()
  {
    this.isLoadingProdutos = true;
    this.productService.getAllCompanyProducts().subscribe((products:EmpresaProdutoModel[])=>{
      
      this.listOfProducts = products;
      this.isLoadingProdutos = false;
       console.log(this.listOfProducts[0].categoria);

    });
    
  }





 /**
   * Methods to handle categoria adn Tipo  adn load products by the type
   * 
   * */ 
  getProductCategoria()
  {
      this.isLoadingCategoria = true;
      
      this.productCategoria = this.categoriaDTService.getProdutoCategoria();

   
  }

  onTipoChange(event)
  {
      this.selectedTipo = event.target.options[event.target.options.selectedIndex].text;
      
      if(event.target.value === "reset"){
              
        this.onCategoriaChange(event);
      }
      else{
            
        this.onloadProdutosByParameters(+event.target.value,"tipo")
      }

  }

  onloadProdutosByParameters(stcategoria:number,choice:string)
  {  
    this.isLoadingProdutos = true;
    this.listOfProducts = null;
        let categoria = stcategoria;
          this.productService.getCompanyProductsByChoice(choice,categoria).subscribe((ProdutoList:EmpresaProdutoModel[])=>{     
          this.listOfProducts = ProdutoList;
          this.isLoadingProdutos = false;
        });

  } 
  
  onCategoriaChange(event)
  {    

    if(event.target.value === "reset")
        {
            this.onLoadEmpresaProdutos();
        }
        else{
          this.isLoadingProdutos = true;
          this.isLoadingTipo = true;
          
          const categoriaID = event.target.value;

          this.selectedCategoria = event.target.options[event.target.options.selectedIndex].text;
          this.selectedTipo = "Tipo";

          this.productCountSubscrip = this.productService.getProdutoTipoByCategoria(categoriaID).subscribe((tipoProduct:BasicModel[])=>{
              
            this.productTipo = tipoProduct["data"];
            this.isLoadingProdutos = false;
          });

          this.onloadProdutosByParameters(categoriaID,'categoria')

        }

    }


    /**
     * Methods to handle Products 
     *   Such as add product and add Edit
     * **/ 
  onAddProduct()
  {
    this.config.backdrop = true;
      const modalRef = this.modalService.open(AddNewProductServiceComponent,{size:'lg',backdropClass:'light-modal-backdrop',centered:false});

      modalRef.componentInstance.sourceParent = "Product";
    
  }
     /**
   * Methods to Handle Delete and edit a Product
   * **/ 
  onDeleteProduct(product:string,id:number){

    console.log(product);
    this.config.backdrop = 'static';
   

     

   const modalRef = this.modalService.open(DialogboxComponent,{size:'md',backdropClass:'light-modal-backdrop',centered:true}) ;

    modalRef.componentInstance.id = id;
    modalRef.componentInstance.source="produto";
    modalRef.componentInstance.message = 'Tem certeza de que deseja excluir o produto ';
    modalRef.componentInstance.object_name = product;
    modalRef.componentInstance.purpose= "Delete";
  
    
  }
  /**
   * Edit Product  
   **/ 

  onEditProduct(content,product:EmpresaProdutoModel){

    this.modalService.open(content,{size:'lg',backdropClass:'light-modal-backdrop',centered:false});

    this.producttoEdit = product

    
    
    // console.log(this.storedConstant.getBASEURL());

    if(product.imagem === "no_product.png")
    {
      
      this.imgURL = this.storedConstant.getBASEURL()+"storage/"+product.imagem;
    }
    else{
      this.imgURL =this.storedConstant.getBASEURL()+"storage/provided/empresa/"+this.storedConstant.userId+"/produtos/"+product.imagem;

    }
        if(product.estado ==='true')
        {
          this.productAvailable = true;
          this.prodAvailability = "Disponivel";
        }else{
          this.productAvailable = false;
          this.prodAvailability = "Indisponivel";
        }

  }


  closeModal()
  {
    // this.activeModal.close();
    this.modalService.dismissAll();
  }

  uploadImage(event)
 {
  this.uploadedFile =<File>event.target.files[0];
  // this.uploadedFile = event.target.files[0];

  this.previewImage(this.uploadedFile);
  this.fileName = this.uploadedFile.name;

 }

 onAvailabilityChange(val:any){
    
  if(val)
  {
    this.productAvailable = false;
    this.prodAvailability = "Indisponivel";
  }
  else{
    this.productAvailable = true;
    this.prodAvailability = "Disponivel";
  }
 
   
}

onUpdateProduct(updateForm:NgForm)
  {
       
    let description = updateForm.value.prod_descript;
    let price = updateForm.value.prod_Price;
    let stock = updateForm.value.prod_Stock;


     if(this.uploadedFile === null)
     {
       
        //update the product with old image
        this.productService.updateEmpresaProduto(this.producttoEdit.imagem,null,price,this.productAvailable,this.producttoEdit.id,description,stock).subscribe((event)=>{

          if(event.type === HttpEventType.UploadProgress){
            console.log('Upload Progress: '+ Math.round(event.loaded / event.total * 100) + '%');
            this.uploadPercentage = Math.round(event.loaded / event.total * 100);
          }
          else if(event.type == HttpEventType.Response){
            console.log(event);
            console.log(event.body['data']['id']);

            if(event.body['data']['id'])
            {
              this.uploadMessageType = "success";
              this.uploadMessage = "Serviço actualizado com successo!";
              this.isUploadingServico = false;
            }
            else{
              this.uploadMessageType = "unsuccess";
              this.uploadMessage = "Occorreo um erro ao actualizar o serviço.";
            }
          }

        });

     }
     else{
        
      this.productService.updateEmpresaProduto(null,this.uploadedFile,price,this.productAvailable,this.producttoEdit.id,description,stock).subscribe((event)=>{
          
        if(event.type === HttpEventType.UploadProgress){
          console.log('Upload Progress: '+ Math.round(event.loaded / event.total * 100) + '%');
          this.uploadPercentage = Math.round(event.loaded / event.total * 100);
        }
        else if(event.type == HttpEventType.Response){
          console.log(event);
          console.log(event.body['data']['id']);

          if(event.body['data']['id'])
          {
            this.uploadMessageType = "success";
            this.uploadMessage = "Serviço actualizado com successo!";
            this.isUploadingServico = false;
          }
          else{
            this.uploadMessageType = "unsuccess";
            this.uploadMessage = "Occorreo um erro ao actualizar o serviço.";
          }
        }


      });
      //update the product with a new Image

       
     }

  }

onDisplayPrice(val:any)
{

  if(val)
  {
    this.priceDisplay = false;
    this.productPrice_availability = "Ocultar";
  }
  else{
    this.priceDisplay = true;
    this.productPrice_availability = "Mostrar";
  }
  console.log("Display price", this.priceDisplay);

}
 

previewImage(files) {

    if (files.length === 0)
      return;
 
    var mimeType = files.type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "So podes usar images!";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
}



  /***
   *  
   * */ 
  
  
  _toggleSidebar() { 
    this._opened = !this._opened;
  }
  _toggleRightbar()
  {
    this._rightBarOpened = !this._rightBarOpened;
  }
   
  ngOnDestroy(){
    this.productCountSubscrip.unsubscribe();
    // this.subGetProdutoTipo.unsubscribe
  }
}
