import { CompanyInfoServiceService } from './../../../core-services/http-service/business/Company Service/company-info-service.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rightsidebar',
  templateUrl: './rightsidebar.component.html',
  styleUrls: ['./rightsidebar.component.scss']
})
export class RightsidebarComponent implements OnInit {


  percent:number=10;
  color:string;
  profileIscomplete:boolean;

  constructor(private companyService:CompanyInfoServiceService) { }

  ngOnInit(): void {

    this.loadCompanyService();
  }

  loadCompanyService()
  {
      this.companyService.getProfileProgress().subscribe((profileProgess)=>{

         this.percent = profileProgess['profile_progress'];
          
         if(this.percent < 45)
         {
          this.color ="#e53935";
         }else if(this.percent > 45 && this.percent < 75)
         {
            this.color="#ff6f00";
         }
         else{
          
            this.color ="#008000";
         }


      });

  }



}
