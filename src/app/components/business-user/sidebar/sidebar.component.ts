import { STOREDCONSTANTS } from './../../../module/constants.service';
import { AuthService } from './../../../core-services/http-service/auth.service';
import { CompanyData } from './../../../data/models/business-user/company-model';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../../core-services/http-service/business/products.service';
import { BasicModel } from '../../../data/models/supporting/basic-model.model';


import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  
  @Input() toogleSideBar:boolean;


  companyData:CompanyData;
  

  private userSub: Subscription;

  private tokenSub: Subscription;
  
  _opened: boolean = true;
  _docked: boolean = true;
  _Mode:string = 'push';

  imgSRC = "https://i.pinimg.com/236x/ab/5a/73/ab5a738539e17fb0b4adb350a11f39f6--logo-design-contest-media-marketing.jpg";

  isLoadingCategoria:boolean;
  productCategoria:BasicModel[];

  constructor(private authService:AuthService,private productService:ProductsService,private storeValues:STOREDCONSTANTS) { }

  ngOnInit(): void {
    this.getUserData();
  }
  
  _toggleSidebar() {
    this._opened = !this._opened;
  }
  
  getProductCategoria()
  {
      this.isLoadingCategoria = true;
      this.productService.getProductCategoria().subscribe((respCategoria:BasicModel[])=>{
            
        this.productCategoria = respCategoria['data'];
        this.isLoadingCategoria = false;
      });

      // this.productService.getProductCategoria();

  }

  getUserData()
  {
    this.userSub = this.authService.companyDataSubj.subscribe((company:CompanyData)=>{     
     
        this.companyData = company;
        this.imgSRC =this.storeValues.getBASEURL()+"storage/provided/empresa/"+this.companyData.id+"/logo/"+this.companyData.logo;
  
    });
 
  }


}
