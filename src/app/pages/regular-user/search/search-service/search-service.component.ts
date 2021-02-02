import { Subscription } from 'rxjs';
import { STOREDCONSTANTS } from './../../../../module/constants.service';
import { SearchService } from './../../../../core-services/http-service/SearchService/search.service';
import { SearchResultDataService } from './../../../../core-services/DataService/SearchResult/search-result-data.service';
import { ResultItemServico } from './../../../../data/models/regular-user/resultItemServico.model';
import { NgForm } from '@angular/forms';
import { FiltersService } from './../../../../core-services/http-service/FiltersService/filters.service';
import { BasicModel } from './../../../../data/models/supporting/basic-model.model';
import { CategoriaDataServiceService } from './../../../../core-services/DataService/categoria/categoria-data-service.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-service',
  templateUrl: './search-service.component.html',
  styleUrls: ['./search-service.component.scss']
})
export class SearchServiceComponent implements OnInit,OnDestroy {

  // Pagination
  page = 4;
  totalItems = 0;
  last_page = 0;
  itemsCount = 0;

   //Categoria dos Produtos
   serviceCategoria:BasicModel[];
   serviceSubCategoria:BasicModel[];


   categoriaId:number;
   selectedCategoria:string;
   _baseUrl:string;

   //Municipio
   municipios:BasicModel[];
   bairros:BasicModel[];

   //Results Array
   resultItems:ResultItemServico[];

   //Searching 
   isSearching:boolean = false;
   isEmptyResult:boolean = true;
  
   searchServiceSub : Subscription;
   servicoName:string;

   paginate:boolean = false;

  constructor(private categoriaDTService:CategoriaDataServiceService,private filterService:FiltersService,private searchResultData:SearchResultDataService, private route:ActivatedRoute,
              private searchService:SearchService,private storeValues:STOREDCONSTANTS) { }

  ngOnInit(): void {
  
    this._baseUrl = this.storeValues.getBASEURL()+"storage/provided/empresa/";
    this.getserviceCategoria();
    this.getMunicipios();
   // this.getSearchResult();
    this.getParamsToSearch();
  }

  getserviceCategoria()
  {

   this.serviceCategoria = this.categoriaDTService.getServicoCategoria();

  }

  onCategoriaChange(event)
  {
   
    
      if(event.target.value === "reset")
      {
          
          // this.selectedCategoria = "Categoria";
          // this.selectedTipo ="Tipo";
          
      }
      else{
        this.selectedCategoria = event.target.options[event.target.options.selectedIndex].text;

         this.categoriaId = event.target.value;

        this.filterService.getServiceTypeByCategory(this.categoriaId).subscribe((tipoResp:BasicModel[])=>{
      
          this.serviceSubCategoria = tipoResp['data'];

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
    
    const searchParam = searchServiceForm.value.servicoNome;
    const searchCategoria =searchServiceForm.value.categoriaParam;
    const searchSubCategoria = searchServiceForm.value.subCategoriaParam;
    const searchMunicipio = searchServiceForm.value.municipioParam;
    const searchBairro =  searchServiceForm.value.bairroParam;

    console.log("Parameter "+searchParam);
    console.log("Categoria" + searchCategoria);
    console.log("SubCategoria" + searchSubCategoria);
    console.log(" Municipio " + searchMunicipio);
    console.log("Bairro "+searchBairro);

    

    this.search_a_Servico(searchParam,"",searchCategoria,searchSubCategoria,null,searchMunicipio,searchBairro);
  }
  

  public onPageChange(pageNum: number): void {

   this.isSearching = true;
 
     this.searchService.servicoPage(pageNum).subscribe((searchResult:ResultItemServico[])=>{
        
        
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
          });

     
    
  }
  

  getParamsToSearch(){

     this.servicoName = this.route.snapshot.queryParamMap.get("nome");
 
     this.search_a_Servico(this.servicoName)

     


  }

  search_a_Servico(name:string = "",prestador:string ="",categoria:string = "",tipo:string ="",provincia:string ="",municipio:string ="",bairro:string ="")
  {
    this.isSearching = true;

   this.searchServiceSub = this.searchService.searchServico(name,prestador,categoria,tipo,provincia,municipio,bairro).subscribe((searchResult:ResultItemServico[])=>{

      console.log("Searching "+name);
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
    });

  }


  getSearchResult()
  {
    
    var results = this.searchResultData.getServicoResult();

    this.resultItems = this.searchResultData.getServicoResult();
  }
  
  ngOnDestroy()
  {
    this.searchServiceSub.unsubscribe;
  }

}
