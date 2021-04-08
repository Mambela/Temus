import { AuthService } from './../../../core-services/http-service/Authentication Service/auth.service';
import { UserData } from './../../../data/models/regular-user/UserData.model';
import { TokenData } from './../../../data/models/supporting/token-model';
import { Subscription } from 'rxjs';
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
  
  private userSub: Subscription;
  tokenData:TokenData;
  private tokenSub: Subscription;
  private userDataSub:Subscription;

  isAuthenticated = false;

  // companyData:CompanyData;
  userData:UserData;

  searchResult:ResultItemServico[];

  constructor(config:NgbRatingConfig,private filterService:FiltersService,private productService:ProductsService,private authService:AuthService,
              private categoriaServicoService:CompanyServicesService,private searchResultData:SearchResultDataService) { 
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit(): void {
    
    this.getSearchCategorias();
    this.verifyAuthentication();
    
  }

  getSearchCategorias()
  {
   
    this.filterService.getProductCategoria().subscribe();
    this.filterService.getLocalsCategoria().subscribe();
    this.filterService.getServiceCategoria().subscribe();
    this.filterService.getMunicipios().subscribe();

  }

  verifyAuthentication():void
  {
    


    this.userDataSub = this.authService.userDataSubj.subscribe((userdata:UserData)=>{
  

        console.log("User Data",userdata);
        
        this.isAuthenticated = !userdata ? false : true;

        if(this.isAuthenticated)
        {
          this.userData = userdata;
          console.log("Authenticated Yes");
        }
        else{

          console.log("Authenticated NOT at all");
          
        }

    });




    this.tokenSub = this.authService.tokenDataSubj.subscribe((company:TokenData)=>{

      this.tokenData = company;

   
    });




  }


}
