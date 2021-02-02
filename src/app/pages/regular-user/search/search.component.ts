import { SearchResultDataService } from './../../../core-services/DataService/SearchResult/search-result-data.service';
import { ResultItemServico } from './../../../data/models/regular-user/resultItemServico.model';
import { FiltersService } from './../../../core-services/http-service/FiltersService/filters.service';
import { CompanyServicesService } from '../../../core-services/http-service/business/Servicos services/services.service';

import { ProductsService } from '../../../core-services/http-service/business/Produto Services/products.service';
import { Component, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [NgbRatingConfig]
})
export class SearchComponent implements OnInit {


  searchResult:ResultItemServico[];

  constructor(config:NgbRatingConfig,private filterService:FiltersService,private productService:ProductsService,
              private categoriaServicoService:CompanyServicesService,private searchResultData:SearchResultDataService) { 
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit(): void {
    
    this.getSearchCategorias();
    
  }

  getSearchCategorias()
  {
   
    this.filterService.getProductCategoria().subscribe();
    this.filterService.getLocalsCategoria().subscribe();
    this.filterService.getServiceCategoria().subscribe();
    this.filterService.getMunicipios().subscribe();

  }


}
