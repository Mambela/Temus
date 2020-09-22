import { TokenData } from './../../../../data/models/supporting/token-model';
import { STOREDCONSTANTS } from './../../../../module/constants.service';
import { Router } from '@angular/router';
import { CompanyData } from './../../../../data/models/business-user/company-model';
import { AuthService } from './../../../../core-services/http-service/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-business-topnavbar',
  templateUrl: './business-topnavbar.component.html',
  styleUrls: ['./business-topnavbar.component.scss']
})
export class BusinessTopnavbarComponent implements OnInit, OnDestroy {

  isAuthenticated = false;

  companyData:CompanyData;
  tokenData:TokenData;

  private userSub: Subscription;

  private tokenSub: Subscription;

  constructor(private authService:AuthService,private router:Router,private storeValues:STOREDCONSTANTS) { }

  ngOnInit(): void {

    this.verifyAuthentication();

  }


  verifyAuthentication()
  {
    this.userSub = this.authService.companyDataSubj.subscribe((company:CompanyData)=>{

      this.isAuthenticated = !company ? false : true;
      
    

      
      
      if(this.isAuthenticated)
      {
        this.companyData = company;
      }
      else{
        this.router.navigate(['/business']);
      }  
    });
  
    this.tokenSub = this.authService.tokenDataSubj.subscribe((company:TokenData)=>{

      this.tokenData = company;

    
    });

  }

  onLogOut()
  {
    this.authService.signOut();
  }

  ngOnDestroy()
  {
    this.userSub.unsubscribe();
    this.tokenSub.unsubscribe();
  }

}
