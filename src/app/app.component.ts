import { AuthService } from './core-services/http-service/Authentication Service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FiltersService } from './core-services/http-service/FiltersService/filters.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Temus';

  constructor(private authService:AuthService,private filtersService:FiltersService)
  {

  }

  ngOnInit():void
  {
    this.filtersService.getProductCategoria();
    this.filtersService.getServiceCategoria();
    this.filtersService.getLocalsCategoria();
    this.authService.autoLoginBusiness();
  }
}


 

