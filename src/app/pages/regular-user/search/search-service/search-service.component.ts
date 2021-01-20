import { FiltersService } from './../../../../core-services/http-service/FiltersService/filters.service';
import { BasicModel } from './../../../../data/models/supporting/basic-model.model';
import { CategoriaDataServiceService } from './../../../../core-services/DataService/categoria/categoria-data-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-service',
  templateUrl: './search-service.component.html',
  styleUrls: ['./search-service.component.scss']
})
export class SearchServiceComponent implements OnInit {

   //Categoria dos Produtos
   serviceCategoria:BasicModel[];
   serviceSubCategoria:BasicModel[];


   categoriaId:number;
   selectedCategoria:string;


   //Municipio
   municipios:BasicModel[];
   bairros:BasicModel[];

   

  constructor(private categoriaDTService:CategoriaDataServiceService,private filterService:FiltersService) { }

  ngOnInit(): void {

    this.getserviceCategoria();
    this.getMunicipios();
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

}
