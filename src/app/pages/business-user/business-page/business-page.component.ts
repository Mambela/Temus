import { CompanyData } from './../../../data/models/business-user/company-model';
import { Router } from '@angular/router';
import { AuthService } from '../../../core-services/http-service/Authentication Service/auth.service';
import { NgForm } from '@angular/forms';
import { DatasharingService } from './../../../core-services/DataService/share/datasharing.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

 


@Component({
  selector: 'app-business-page',
  templateUrl: './business-page.component.html',
  styleUrls: ['./business-page.component.scss']
})
export class BusinessPageComponent implements OnInit {

  isAuthenticated = false;

  
  showAuthform:boolean = false;
  isLoading = false;
  authError:any;
  
  
  constructor(private shareData:DatasharingService, private authService:AuthService,private router: Router) { }

  ngOnInit(): void {
  }

  sendCompanyName(event:any)
  {
      // console.log("Business Page",event.value);
      this.shareData.setCompanyName(event.value);
  
  }

  onSignIn(signinForm:NgForm)
  {

        if(!signinForm.valid)
        {
            return;
        }

        const username = signinForm.value.username;
        const password = signinForm.value.password;
        this.isLoading = true;

        this.authService.companySingIn(username,password).subscribe((authresp)=>{

       
            
          /**
           * In case we get no error here is where we re route the user to the Dashboard of the application. 
           * */ 
          
          if(authresp.success === true)
          {
            this.router.navigate(['/business-dashboard']);
          }
          this.isLoading = false;

        },
        authError =>{

          /**
           * In case we get some errors here is where we handle it 
           * */ 
          this.isLoading = false;
          console.log(authError);
          this.authError = authError;
        });
  }

  toggleAuthForm()
  {
    this.showAuthform = !this.showAuthform;
    console.log(this.showAuthform);
  }

  

}
