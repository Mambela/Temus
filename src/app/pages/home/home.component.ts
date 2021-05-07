import { TokenData } from './../../data/models/supporting/token-model';
import { Subscription } from 'rxjs';
import { UserData } from './../../data/models/regular-user/UserData.model';
import { AuthService } from './../../core-services/http-service/Authentication Service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  private userSub: Subscription;
  tokenData:TokenData;
  private tokenSub: Subscription;
  private userDataSub:Subscription;

  isAuthenticated = false;

  // companyData:CompanyData;
  userData:UserData;


  constructor(private authService:AuthService) {}

  ngOnInit(): void {
    
    this.verifyAuthentication();
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
