import { NgForm } from '@angular/forms';
import { CategoriaDataServiceService } from './../../../core-services/DataService/categoria/categoria-data-service.service';
import { BasicModel } from './../../../data/models/supporting/basic-model.model';
import { Component, OnInit } from '@angular/core';
import { FiltersService } from 'src/app/core-services/http-service/FiltersService/filters.service';

@Component({
  selector: 'app-servicofilters',
  templateUrl: './servicofilters.component.html',
  styleUrls: ['./servicofilters.component.scss']
})
export class ServicofiltersComponent implements OnInit {
  

  //Categoria dos Produtos
   serviceCategoria:BasicModel[];
   serviceSubCategoria:BasicModel[];

   categoriaId:number;
   selectedCategoria:string;

   bairros:BasicModel[];
   municipios:BasicModel[];


  constructor(private categoriaDTService:CategoriaDataServiceService,private filterService:FiltersService) { }

  ngOnInit(): void {
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

    

    //this.search_a_Servico(searchParam,"",searchCategoria,searchSubCategoria,null,searchMunicipio,searchBairro);
  }
  

}
