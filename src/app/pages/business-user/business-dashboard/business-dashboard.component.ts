import { AddNewServiceComponent } from './../../../sections/business/add-new-service/add-new-service.component';
import { AddNewProductServiceComponent } from './../../../sections/business/add-new-product-service/add-new-product-service.component';
import { TokenData } from './../../../data/models/supporting/token-model';
import { CompanyService } from './../../../core-services/http-service/company-service.service';
import { CompanyData } from './../../../data/models/business-user/company-model';
import { AuthService } from './../../../core-services/http-service/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-business-dashboard',
  templateUrl: './business-dashboard.component.html',
  styleUrls: ['./business-dashboard.component.scss']
})
export class BusinessDashboardComponent implements OnInit {
  
  _opened: boolean = true;
  _rightBarOpened: boolean = false;
  _docked: boolean = true;
  _Mode:string = 'push';
  isAuthenticated = false;


  companyData:CompanyData;
  
  isLoading:boolean = true;

  //User Data
  numberOfEvents:number;
  numberOfProducts:number;
  numberOfServices:number;

  private userSub: Subscription;
  tokenData:TokenData;
  private tokenSub: Subscription;

  constructor(private authService:AuthService,private router:Router, private companyService:CompanyService,private modalService:NgbModal,private config:NgbModalConfig) { }
  

  ngOnInit(): void {

     

    this.verifyAuthentication();  
    this.getuserData();
    
  }
  
 
   _toggleSidebar() { 
    this._opened = !this._opened;
  }
  _toggleRightbar()
  {
    this._rightBarOpened = !this._rightBarOpened;
  }

  verifyAuthentication()
  {
    this.userSub = this.authService.companyDataSubj.subscribe((company:CompanyData)=>{
      
      console.log("inside the verifyAuthentication");

      this.isAuthenticated = !company ? false : true;
      
      console.log(this.isAuthenticated);
      
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


  getuserData()
  {
    this.isLoading = true;
    this.companyService.getDetails().subscribe((userData)=>{
      
      console.log(userData);
      
      this.numberOfEvents = userData[0].eventCount;
      this.numberOfProducts = userData[0].productCount;
      this.numberOfServices = userData[0].serviceCount;
      this.isLoading = false;

    });
  }

  onAddProduct(){

    this.config.backdrop = true;
      const modalRef = this.modalService.open(AddNewProductServiceComponent,{size:'lg',backdropClass:'light-modal-backdrop',centered:false});

      modalRef.componentInstance.sourceParent = "Product";

  }

  onAddService(){
    this.config.backdrop = true;
    const modalRef = this.modalService.open(AddNewServiceComponent,{size:'lg',backdropClass:'light-modal-backdrop',centered:false});

    modalRef.componentInstance.sourceParent = "Product";
  }

  onAddEvent(){

  }


}
