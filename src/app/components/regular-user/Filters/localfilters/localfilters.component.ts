import { BasicModel } from './../../../../data/models/supporting/basic-model.model';
import { FiltersService } from '../../../../core-services/http-service/FiltersService/filters.service';
import { CategoriaDataServiceService } from '../../../../core-services/DataService/categoria/categoria-data-service.service';

import { NgForm } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-localfilters',
  templateUrl: './localfilters.component.html',
  styleUrls: ['./localfilters.component.scss']
})
export class LocalfiltersComponent implements OnInit,OnDestroy {


  
  //Categoria dos Produtos
  localCategoria:BasicModel[];
  localSubCategoria:BasicModel[];


  //Municipio
   municipios:BasicModel[];
   bairros:BasicModel[];


   
   _baseUrl:string;
  





  constructor(private categoriaDTService:CategoriaDataServiceService, private filterService:FiltersService) { }

  ngOnInit(): void {

    //this.getLocalCategoria();
  }

  onSearch(filterForm:NgForm)
  {

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

  ngOnDestroy()
  {
    

  }

}
