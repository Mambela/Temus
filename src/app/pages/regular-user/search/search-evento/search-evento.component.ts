import { FiltersService } from './../../../../core-services/http-service/FiltersService/filters.service';
import { CategoriaDataServiceService } from './../../../../core-services/DataService/categoria/categoria-data-service.service';
import { BasicModel } from './../../../../data/models/supporting/basic-model.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-evento',
  templateUrl: './search-evento.component.html',
  styleUrls: ['./search-evento.component.scss']
})
export class SearchEventoComponent implements OnInit {

  

  //Municipio
  municipios:BasicModel[];
  bairros:BasicModel[];


  constructor(private categoriaDTService:CategoriaDataServiceService,private filterService:FiltersService) { }

  ngOnInit(): void {
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
