import { FiltersService } from './../../../../core-services/http-service/FiltersService/filters.service';
import { CategoriaDataServiceService } from './../../../../core-services/DataService/categoria/categoria-data-service.service';
import { Subscription } from 'rxjs';
import { BasicModel } from './../../../../data/models/supporting/basic-model.model';
import { ProductsService } from '../../../../core-services/http-service/business/Produto Services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-produto',
  templateUrl: './search-produto.component.html',
  styleUrls: ['./search-produto.component.scss']
})
export class SearchProdutoComponent implements OnInit {


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


  constructor(private productService:ProductsService,private categoriaDTService:CategoriaDataServiceService,private filterService:FiltersService) { }

  ngOnInit(): void {
    this.getProductCategoria();
    this.getMunicipios();
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

}
