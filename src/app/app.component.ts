import { UserData } from './data/models/regular-user/UserData.model';
import { CompanyData } from './data/models/business-user/company-model';
import { Router } from '@angular/router';
import { TokenData } from './data/models/supporting/token-model';
import { Subscription } from 'rxjs';
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

  private userSub: Subscription;
  tokenData:TokenData;
  private tokenSub: Subscription;
  private userDataSub:Subscription;

  isAuthenticated = false;

  companyData:CompanyData;
  userData:UserData;

  constructor(private authService:AuthService,private filtersService:FiltersService,private router:Router)
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


 

