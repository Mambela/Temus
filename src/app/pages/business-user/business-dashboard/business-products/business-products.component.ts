import { EmpresaProdutoModel } from './../../../../data/models/business-user/empresa-product.model';
import { EmpresaServicoModel } from './../../../../data/models/business-user/empresa-servico.model';
import { BasicModel } from './../../../../data/models/supporting/basic-model.model';
import { ProductsService } from './../../../../core-services/http-service/business/products.service';
import { CompanyService } from './../../../../core-services/http-service/company-service.service';
import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}

const COUNTRIES: Country[] = [
  {
    name: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    area: 17075200,
    population: 146989754
  },
  {
    name: 'Canada',
    flag: 'c/cf/Flag_of_Canada.svg',
    area: 9976140,
    population: 36624199
  },
  {
    name: 'United States',
    flag: 'a/a4/Flag_of_the_United_States.svg',
    area: 9629091,
    population: 324459463
  },
  {
    name: 'China',
    flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    area: 9596960,
    population: 1409517397
  }
];



@Component({
  selector: 'app-business-products',
  templateUrl: './business-products.component.html',
  styleUrls: ['./business-products.component.scss']
})


export class BusinessProductsComponent implements OnInit, OnDestroy {
  

  countries = COUNTRIES;

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


  constructor(private companyService:CompanyService,private productService:ProductsService) {
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
   * Methods to handle categoria adn Tipo 
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
