import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.scss']
})
export class BusinessProfileComponent implements OnInit {


  accountIsActive:boolean=true;
  companyDetailsIsActive:boolean;
  addressIsActive:boolean;
  sectorIsActive:boolean;
  workingHoursIsActive:boolean;

  constructor() { }

  ngOnInit(): void {
  }
  

  showAccount()
  {
    this.hideAll();
    this.accountIsActive = true;
  }

  showCompany(){
    this.hideAll();
    this.companyDetailsIsActive = true;
    

  }

  showAddress(){
    this.hideAll();
      this.addressIsActive = true;
    
  }

  showSector(){
    this.hideAll()
    this.sectorIsActive = true;
    
   

  }

  showWorkingHours(){
    this.hideAll();
    this.workingHoursIsActive = true;
      
      
  }
  

  hideAll()
  {
    this.accountIsActive = false;
    this.companyDetailsIsActive = false;
    this.addressIsActive = false;
    this.sectorIsActive = false;
    this.workingHoursIsActive = false;
  }



}
