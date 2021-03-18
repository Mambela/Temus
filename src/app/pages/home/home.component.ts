import { FiltersService } from '../../core-services/http-service/FiltersService/filters.service';
import { Router } from '@angular/router';
import { SearchService } from '../../core-services/http-service/SearchService/search.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private searchService:SearchService,private router:Router,private filterService:FiltersService) { }

  ngOnInit(): void {
    this.getSearchCategorias();
  }

  onSearch(searchForm : NgForm)
  {
    

    const searchParam = searchForm.value.searchParameter;
    const searchSection = searchForm.value.searchSection;

    console.log(searchSection);
  
    switch (searchSection) {
      case "local":
        this.router.navigate(["pesquisa/local"],{queryParams:{sector:'local','nome':searchParam}});
        break;
      case "services":      
          this.router.navigate(["pesquisa/servico"],{queryParams:{sector:'servico','nome':searchParam}});
        break;
      case "product":
          // this.searchService.searchProduct();
          this.router.navigate(["pesquisa/produto"],{queryParams:{sector:'produto','nome':searchParam}});
          break;    
      default:
        break;
    }
  

  

  }

  getSearchCategorias()
  {
   
    this.filterService.getProductCategoria().subscribe();
    this.filterService.getLocalsCategoria().subscribe();
    this.filterService.getServiceCategoria().subscribe();
    this.filterService.getMunicipios().subscribe();

  }

}
