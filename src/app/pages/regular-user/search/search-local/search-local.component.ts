import { NgForm } from '@angular/forms';
import { STOREDCONSTANTS } from './../../../../module/constants.service';
import { SearchService } from './../../../../core-services/http-service/SearchService/search.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ResultItemServico } from './../../../../data/models/regular-user/resultItemServico.model';
import { FiltersService } from './../../../../core-services/http-service/FiltersService/filters.service';
import { BasicModel } from './../../../../data/models/supporting/basic-model.model';
import { CategoriaDataServiceService } from './../../../../core-services/DataService/categoria/categoria-data-service.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ResultItemLocal } from 'src/app/data/models/regular-user/resultItemLocal.model';

@Component({
  selector: 'app-search-local',
  templateUrl: './search-local.component.html',
  styleUrls: ['./search-local.component.scss']
})
export class SearchLocalComponent implements OnInit,OnDestroy {
  
   // Pagination
   page = 4;
   totalItems = 0;
   last_page = 0;
   itemsCount = 0;
   paginateCounter:number = 0;

  //Categoria dos Produtos
  localCategoria:BasicModel[];
  localSubCategoria:BasicModel[];


  //Municipio
   municipios:BasicModel[];
   bairros:BasicModel[];


   
   _baseUrl:string;
  

   //Results Array
   resultItems:ResultItemLocal[];

   //Searching 
   isSearching:boolean = false;
   isEmptyResult:boolean;


   localNome:string;
   paginate:boolean;
  

  constructor(private categoriaDTService:CategoriaDataServiceService, private filterService:FiltersService,private router:Router,
              private route:ActivatedRoute, private searchService :SearchService , private storedValues:STOREDCONSTANTS) { }

  ngOnInit(): void {

    this._baseUrl = this.storedValues.getBASEURL() +"storage/provided/locations/image/";
    this.getLocalCategoria();
    this.getMunicipios();
    this.getParamsToSearch();                                                            
  }

  getLocalCategoria()
  {
    this.localCategoria = this.categoriaDTService.getLocalCategorias();
  }


  onCategoriaChange(event)
  {
      const categoriId = event.target.value;
      this.filterService.getLocalTipoByCategoria(categoriId).subscribe((tipoLocal:BasicModel[])=>{
            this.localSubCategoria = tipoLocal['data'];
      });
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
    
    const searchParam = searchServiceForm.value.localNome;

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
   this.search_a_local(searchParam,searchCategoria,searchSubCategoria,"",searchMunicipio,searchBairro);
    
  }

  getParamsToSearch()
  {
    this.localNome = this.route.snapshot.queryParamMap.get("nome");

    this.search_a_local(this.localNome);
  
  }

  public onPageChange(pageNum: number): void {

    this.isSearching = true;
    this.paginateCounter =+ 1; 
 
    if(this.paginateCounter > 1)
    {
      this.searchService.localPage(pageNum).subscribe((searchResult:ResultItemLocal[])=>{
         
         
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
       else{
        this.isSearching = false;
         this.paginate = true;
       }
     
   }


  search_a_local(name:string = "",categoria:string ="",tipo:string ="",provincia:string ="",municipio:string ="",bairro:string ="")
  {
    this.isSearching = true;
    this.paginateCounter = 0;

    this.searchService.searchLocal(name,categoria,tipo,provincia,municipio,bairro).subscribe((result)=>{

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

  viewLocal(local:ResultItemLocal)
  {

    

    //this.router.navigate([''])

    if(local.publico)
    {
     
    //  this.router.navigate(['/localpublico']);
      
      this.router.navigate(['/localpublico'], {
        queryParams: { local: local.id,lat:local.lat,lng:local.lng  },
      });

    }
    else
    {
  

      // this.router.navigate(['/localprivate']);
      this.router.navigate(['/localprivate'], {
        queryParams: { local: local.id},
      });
    }
  



  }

  ngOnDestroy()
  {
    this.municipios = null;
  }

}
