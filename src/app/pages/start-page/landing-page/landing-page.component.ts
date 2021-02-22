import { FiltersService } from './../../../core-services/http-service/FiltersService/filters.service';
import { Router } from '@angular/router';
import { SearchService } from './../../../core-services/http-service/SearchService/search.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {

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
      case "servicos":      
          this.router.navigate(["pesquisa/servico"],{queryParams:{sector:'servico','nome':searchParam}});
        break;
      case "produtos":
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

    //   if (signInVisibility == 'hidden') {
    //     formSignIn.style.visibility = 'visible';
    //     formSignUp.style.visibility = 'hidden';
    //   } else {
    //     formSignIn.style.visibility = 'hidden';
    //   }
     

    // btnSignUp.addEventListener('click', (e: Event) => {
    //   e.preventDefault();
    //   let signUpVisibility = formSignUp.style.visibility;

    //   if (signUpVisibility == 'hidden') {
    //     formSignUp.style.visibility = 'visible';
    //     formSignIn.style.visibility = 'hidden';
    //   } else {
    //     formSignUp.style.visibility = 'hidden';
    //   }
    // });
   
}
