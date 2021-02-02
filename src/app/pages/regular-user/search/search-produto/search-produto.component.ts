import { STOREDCONSTANTS } from './../../../../module/constants.service';
import { SearchService } from './../../../../core-services/http-service/SearchService/search.service';
import { NgForm } from '@angular/forms';
import { ResultItemServico } from './../../../../data/models/regular-user/resultItemServico.model';
import { FiltersService } from './../../../../core-services/http-service/FiltersService/filters.service';
import { CategoriaDataServiceService } from './../../../../core-services/DataService/categoria/categoria-data-service.service';
import { Subscription } from 'rxjs';
import { BasicModel } from './../../../../data/models/supporting/basic-model.model';
import { ProductsService } from '../../../../core-services/http-service/business/Produto Services/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-produto',
  templateUrl: './search-produto.component.html',
  styleUrls: ['./search-produto.component.scss']
})
export class SearchProdutoComponent implements OnInit {

   // Pagination
   page = 4;
   totalItems = 0;
   last_page = 0;
   itemsCount = 0;
 

  //Categoria dos Produtos
  productCategoria:BasicModel[];
  productSubCategoria:BasicModel[];
  

  isLoadingCategoria:boolean;
  isLoadingSubcategoria:boolean; // usado como tipo na are do usuario business
  isLoadingProdutos:boolean;

  productCountSubscrip:Subscription;
  
  //Municipio
  municipios:BasicModel[];
  bairros:BasicModel[];

  _baseUrl:string;
  

   //Results Array
   resultItems:ResultItemServico[];

   //Searching 
   isSearching:boolean = false;
   isPaginating:boolean = false;
   isEmptyResult:boolean;


   produtoNome:string;
   paginate:boolean;


  constructor(private productService:ProductsService,private categoriaDTService:CategoriaDataServiceService,private filterService:FiltersService,
              private route:ActivatedRoute, private searchService:SearchService, private storeValues:STOREDCONSTANTS) { }

  ngOnInit(): void {

    this._baseUrl = this.storeValues.getBASEURL()+"storage/provided/empresa/";
    this.getProductCategoria();
    this.getMunicipios();
    this.getParamsToSearch();
  }

  /**
   * Categoria do Produtos. 
  */

  getProductCategoria()
  {

    this.productCategoria = this.categoriaDTService.getProdutoCategoria();

  }

  onCategoriaChange(event)
  {    

    console.log(event);
    if(event.target.value === "reset")
        {
            
        }
        else{
          this.isLoadingProdutos = true;
          this.isLoadingSubcategoria = true;
          
          const categoriaID = event.target.value;

          //this.selectedCategoria = event.target.options[event.target.options.selectedIndex].text;
          

          this.productCountSubscrip = this.filterService.getProdutoTipoByCategoria(categoriaID).subscribe((tipoProduct:BasicModel[])=>{
            console.log(tipoProduct);
              
            this.productSubCategoria = tipoProduct["data"];
            this.isLoadingProdutos = false;
          });

        }

    }


  getMunicipios()
  {
    this.municipios = this.categoriaDTService.getMunicipio();
  }

  onMunicipioChange(event)
  {
    const municipioId = event.target.value;

    this.filterService.getBairrosByMunicipios(municipioId).subscribe((bairros:BasicModel[])=>{
      
      this.bairros = bairros['data'];

    });

  }

  onSearch(searchServiceForm :NgForm)
  {
    
    const searchParam = searchServiceForm.value.produtoNome;
    const fornecedor = "";
    const searchCategoria =searchServiceForm.value.categoriaParam;
    const searchSubCategoria = searchServiceForm.value.subCategoriaParam;
    const searchMunicipio = searchServiceForm.value.municipioParam;
    const searchBairro =  searchServiceForm.value.bairroParam;

    console.log("Parameter "+searchParam);
    console.log("Categoria" + searchCategoria);
    console.log("SubCategoria" + searchSubCategoria);
    console.log(" Municipio " + searchMunicipio);
    console.log("Bairro "+searchBairro);

    

   //  this.search_a_Servico(searchParam,"",searchCategoria,searchSubCategoria,null,searchMunicipio,searchBairro);
   this.search_a_Produto(searchParam,fornecedor,searchCategoria,searchSubCategoria,null,searchMunicipio,searchBairro);

  }


  
  public onPageChange(pageNum: number): void {

   
      this.isPaginating= true;
      this.searchService.productPage(pageNum).subscribe((searchResult:ResultItemServico[])=>{
         
         
             this.resultItems = searchResult['data'];
             console.log(searchResult['meta']);
             this.totalItems = searchResult['meta']['total'];
             this.page = searchResult['meta']['current_page'];
             this.last_page = searchResult['meta']['last_page'];
             this.itemsCount = searchResult['meta']['per_page'];
             if(this.resultItems.length < 1)
               {
                
                 this.isEmptyResult = true;
               }
               else{
                 this.isEmptyResult = false;
               }
               this.isSearching = false;
               this.isPaginating= false;
           });
 
       

     
     
   }
  

  getParamsToSearch()
  {
    this.produtoNome = this.route.snapshot.queryParamMap.get("nome");

    this.search_a_Produto(this.produtoNome);
  
  }

  search_a_Produto(name:string="",fornecedor:string ="",categoria:string ="",tipo:string ="",provincia:string ="",municipio:string ="",bairro:string ="")
  {
    this.isSearching = true;
    this.paginate = false;

    this.searchService.searchProduct(name,fornecedor,categoria,tipo,provincia,municipio,bairro).subscribe((result)=>{

      console.log(result);
      this.resultItems = result['data'];
      console.log(result['meta']);
      this.totalItems = result['meta']['total'];
      this.page = result['meta']['current_page'];
      this.last_page = result['meta']['last_page'];
      this.itemsCount = result['meta']['per_page'];

      if(this.resultItems.length < 1)
      {
    
        this.isEmptyResult = true;
      }
      else{
        this.isEmptyResult = false;

      }

      this.isSearching = false;

    });
  }

}
