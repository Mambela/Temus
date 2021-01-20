import { FiltersService } from './../../../../core-services/http-service/FiltersService/filters.service';
import { BasicModel } from './../../../../data/models/supporting/basic-model.model';
import { CategoriaDataServiceService } from './../../../../core-services/DataService/categoria/categoria-data-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-local',
  templateUrl: './search-local.component.html',
  styleUrls: ['./search-local.component.scss']
})
export class SearchLocalComponent implements OnInit {


  //Categoria dos Produtos
  localCategoria:BasicModel[];
  localSubCategoria:BasicModel[];


  //Municipio
   municipios:BasicModel[];
   bairros:BasicModel[];


  

  constructor(private categoriaDTService:CategoriaDataServiceService, private filterService:FiltersService) { }

  ngOnInit(): void {

    this.getLocalCategoria();
    this.getMunicipios();
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

}
