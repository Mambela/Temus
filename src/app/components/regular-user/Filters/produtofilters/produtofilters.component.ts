import { NgForm } from '@angular/forms';
import { CategoriaDataServiceService } from './../../../../core-services/DataService/categoria/categoria-data-service.service';
import { BasicModel } from './../../../../data/models/supporting/basic-model.model';
import { Component, OnInit } from '@angular/core';
import { FiltersService } from 'src/app/core-services/http-service/FiltersService/filters.service';

@Component({
  selector: 'app-produtofilters',
  templateUrl: './produtofilters.component.html',
  styleUrls: ['./produtofilters.component.scss']
})
export class ProdutofiltersComponent implements OnInit {
  

  bairros:BasicModel[];
  localSubCategoria:BasicModel[];

  //Categoria dos Produtos
  productCategoria:BasicModel[];
  productSubCategoria:BasicModel[];
  

  municipios:BasicModel[];

  constructor(private filterService:FiltersService,private categoriaDTService:CategoriaDataServiceService) { }

  ngOnInit(): void {

    //this.getProductCategoria();
    this.getMunicipios();
  }

  getProductCategoria()
  {

    this.productCategoria = this.categoriaDTService.getProdutoCategoria();

  }


  onMunicipioChange(event)
  {
    const municipioId = event.target.value;

    this.filterService.getBairrosByMunicipios(municipioId).subscribe((bairros:BasicModel[])=>{
      
      this.bairros = bairros['data'];

    });

  }

  getMunicipios()
  {
    this.municipios = this.categoriaDTService.getMunicipio();
  }

  onCategoriaChange(event)
  {
      const categoriId = event.target.value;
      this.filterService.getLocalTipoByCategoria(categoriId).subscribe((tipoLocal:BasicModel[])=>{
            this.localSubCategoria = tipoLocal['data'];
      });
  }

  onSearch(searchForm:NgForm)
   {

   }

}


