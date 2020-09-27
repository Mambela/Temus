import { DialogboxComponent } from './../../../../sections/dialogbox/dialogbox.component';
import { AddNewProductServiceComponent } from './../../../../sections/business/add-new-product-service/add-new-product-service.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { EmpresaProdutoModel } from './../../../../data/models/business-user/empresa-product.model';
import { EmpresaServicoModel } from './../../../../data/models/business-user/empresa-servico.model';
import { BasicModel } from './../../../../data/models/supporting/basic-model.model';
import { ProductsService } from './../../../../core-services/http-service/business/products.service';
import { CompanyService } from './../../../../core-services/http-service/company-service.service';
import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { CategoryService } from 'src/app/core-services/http-service/category-service.service';
import { NgbModalBackdrop } from '@ng-bootstrap/ng-bootstrap/modal/modal-backdrop';

 

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

  subGetProdutoTipo:Subscription;


  constructor(private companyService:CompanyService,private productService:ProductsService,private serviceModal:NgbModal,private categorySer:CategoryService,private config:NgbModalConfig) {
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
   * Methods to Handle Delete and edit a Product
   * **/ 
  onDeleteProduct(product:string,id:number){

    console.log(product);
    this.config.backdrop = 'static';
   

     

   const modalRef = this.serviceModal.open(DialogboxComponent,{size:'md',backdropClass:'light-modal-backdrop',centered:true}) ;

    modalRef.componentInstance.id = id;
    modalRef.componentInstance.source="produto";
    modalRef.componentInstance.message = 'Tem certeza de que deseja excluir o produto ';
    modalRef.componentInstance.object_name = product;
    modalRef.componentInstance.purpose= "Delete";
  
    
  }

  onEditProduct(){

  }



 /**
   * Methods to handle categoria adn Tipo  adn load products by the type
   * 
   * */ 
  getProductCategoria()
  {
      this.isLoadingCategoria = true;
      this.productService.getProductCategoria().subscribe((respCategoria:BasicModel[])=>{
            
        this.productCategoria = respCategoria['data'];
        this.isLoadingCategoria = false;
      });

      // this.productService.getProductCategoria();

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
        this.subGetProdutoTipo = this.productService.getCompanyProductsByChoice(choice,categoria).subscribe((ProdutoList:EmpresaProdutoModel[])=>{     
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
      const modalRef = this.serviceModal.open(AddNewProductServiceComponent,{size:'lg',backdropClass:'light-modal-backdrop',centered:false});

      modalRef.componentInstance.sourceParent = "Product";

      
    
  }
 
  
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
