import { ToasterService } from './../../../sections/toast/toaster.service';
import { catchError, distinctUntilChanged, debounceTime, tap, switchMap } from 'rxjs/operators';
import { STOREDCONSTANTS } from './../../../module/constants.service';
import { CompanyService } from './../../../core-services/http-service/company-service.service';
import { BasicModel } from './../../../data/models/supporting/basic-model.model';
import { streetModel } from './../../../data/models/supporting/street-model.model';
import { AddressesService } from './../../../core-services/http-service/addresses-service.service';
import { AuthService } from './../../../core-services/http-service/auth.service';
import { Subscription, Observable, of } from 'rxjs';
import { CompanyData } from './../../../data/models/business-user/company-model';
import { NgForm } from '@angular/forms';
import { RegistrationMapService } from './../../../core-services/utility-service/registration-map.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpEventType } from '@angular/common/http';

interface iCompanyAddress{
  province:string;
  municipio:string;
  bairro: string;
  rua:string;
  latitude:number;
  longitude:number;
}
interface iMessage{
  success:boolean;
  message:string;
}
@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.scss']
})
export class BusinessProfileComponent implements OnInit,OnDestroy {




  isAuthenticated = false;
  companyData:CompanyData;
  currentCategoria:string;
  private userSub: Subscription;

  accountIsActive:boolean=true;
  companyDetailsIsActive:boolean;
  addressIsActive:boolean;
  sectorIsActive:boolean;
  workingHoursIsActive:boolean;

  //changeSwitch
  produtoAvailable:boolean;
  priceDisplay:boolean;

  /**
   * Working Hours for the company*
   * */ 
  _Monday_WrHr:boolean=true;
  _Tuesday_WrHr:boolean=false;
  _Wednesday_WrHr:boolean=false;
  _Thursday_WrHr:boolean=false;
  _Friday_WrHr:boolean=false;
  _Saturday_WrHr:boolean=false;
  _Sunday_WrHr:boolean=false;

  /**
   * Address Manipulation 
   * */ 
  provinces:BasicModel[];
  municipalities:BasicModel[];
  neighbourhoods:BasicModel[];
  streets:streetModel;
  businessProvince:string;businessMunicipality:string; businessNeighbourhood:string; 
  companyAddress:iCompanyAddress;


    //being used to assign a municipio for the rua 
    neighborhood:number=null;
    neighborhoodSelected= false;

  //Actual Working Hours
   workingHours:string[]=[]; 

    // workingHours: Array<string>;
    businessRuaID:number = 0;
    businessRuaDesignacao:string ="";

  // FOR IMAGES
  imagePath;
  imgURL: any="https://i.pinimg.com/236x/ab/5a/73/ab5a738539e17fb0b4adb350a11f39f6--logo-design-contest-media-marketing.jpg";
  message: string;
  fileName:string='Choose file';
  uploadedFile:File=null;
  uploadingProgress:number;

  // Search items
   searching=false;
   searchingFailed = false;
   selectedCategoria:BasicModel;
   isSuccess:boolean;
   
   streetresultformatter = (StreetList: {rua : streetModel})=> StreetList.rua;


  // For 
  streetSearch = (streetText$: Observable<string>)=> 
  
      streetText$.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        
        tap(()=> this.searching = true),
        switchMap(term => 
           this.addressService.getStreetsbyNeighbourhood(this.neighborhood,term).pipe(
             tap(() => this.searchingFailed = false),
              catchError(() => {
                this.searchingFailed = true;
                return of([]);
              })),
            ),
            tap(() =>this.searching =false)
      )


  constructor(private mapBox: RegistrationMapService,private authService:AuthService,private addressService: AddressesService, 
              private companyservice: CompanyService,private storeValues:STOREDCONSTANTS,
              private toaster: ToasterService) { 
                
              }

  ngOnInit(): void {
    
    this.fetchCompanyAddress();
    this.getCompanyDetails();
    this.getAllProvinces();
  }

  /**
   * GEt Company Profile
   * 
   * */ 

  getCompanyDetails()
  {
    this.userSub = this.authService.companyDataSubj.subscribe((company:CompanyData)=>{
      
      
      this.companyData = company;
      this.imgURL =this.storeValues.getBASEURL()+"storage/provided/empresa/"+this.companyData.id+"/logo/"+this.companyData.logo;
      
    });
  

  }

  userSelectedRua(event:any){

    const ruaObj:streetModel = event.item;
    
    this.businessRuaID = ruaObj.id;
    this.businessRuaDesignacao = ruaObj.rua;
    
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
    // this.loadMiniMap();
    
 
    
    this.hideAll();
      this.addressIsActive = true;
    
  }

  showSector(){
    this.hideAll()
    this.sectorIsActive = true;
    
    this.companyservice.getCompanyCategory().subscribe((categoria)=>{
        
        console.log(categoria);

        this.currentCategoria = categoria[0].designacao;


    });
   

  }

  showWorkingHours(){
    this.hideAll();
    this.workingHoursIsActive = true;
      
      
  }
  
  fetchCompanyAddress()
  {
    this.companyservice.getCompanyAddress().subscribe((address)=>{

      this.companyAddress = address[0];
      
      console.log(this.companyAddress.province);

    });
  }  




 



  /**
   * METHODS TO HANDLE 
   * */  

 
  onOpenDay(contentDay)
  {
    let checkedDay= contentDay.name

      if(checkedDay =="mondayWrHr"){
        // this.showDayWorkingHours();
            
        if(contentDay.checked == true)
        {
                this._Monday_WrHr = true;
        }
        else{

          this._Monday_WrHr = false;

        }

      }

      if(checkedDay =="tuesdayWrHr"){
        // this.showDayWorkingHours();
            
        if(contentDay.checked == true)
        {
                this._Tuesday_WrHr = true;
        }
        else{
          this._Tuesday_WrHr = false;

        }

      }

      if(checkedDay =="wednesdayWrHr"){
        // this.showDayWorkingHours();
            
        if(contentDay.checked == true)
        {
          this._Wednesday_WrHr = true;
        }
        else{
          this._Wednesday_WrHr = false;

        }

      }

      if(checkedDay =="thursdayWrHr"){
        // this.showDayWorkingHours();
            
        if(contentDay.checked == true)
        {
                this._Thursday_WrHr = true;
        }
        else{
          this._Thursday_WrHr = false;

        }

      }

      if(checkedDay =="fridayWrHr"){
        // this.showDayWorkingHours();
            
        if(contentDay.checked == true)
        {
                this._Friday_WrHr = true;
        }
        else{
          this._Friday_WrHr = false;

        }

      }

      if(checkedDay =="satudayWrHr"){
        // this.showDayWorkingHours();
            
        if(contentDay.checked == true)
        {
                this._Saturday_WrHr = true;
        }
        else{
          this._Saturday_WrHr = false;

        }

      }

      if(checkedDay =="sundayWrHr"){
        // this.showDayWorkingHours();
            
        if(contentDay.checked == true)
        {
                this._Sunday_WrHr = true;
        }
        else{
          this._Sunday_WrHr = false;

        }

      }

    
    


  }

  showDayWorkingHours()
  {

  }

  

  TestDropHr(val:any){

    console.log(val);
    let name:string=val.name;

    switch (name) {
        case "mondayOpenTime":
            this.workingHours[0] = val.value;
            console.log(name);
          break;

        case "mondayCloseTime":
            this.workingHours[1] = val.value;  
          break;
        
        case "tuesdayOpenTime":
            this.workingHours[2] = val.value;  
          break; 
          
        case "tuesdayCloseTime":
            this.workingHours[3] = val.value;  
          break;  
        
        case "wednesdayOpenTime":
            this.workingHours[4] = val.value;  
          break;  
        
        case "wednesdayCloseTime":
            this.workingHours[5] = val.value;  
          break;
        
        case "thursdayOpenTime":
            this.workingHours[6] = val.value;  
            break;

        case "thursdayCloseTime":
              this.workingHours[7] = val.value;  
              break;
        
        case "fridayOpenTime":
              this.workingHours[8] = val.value;  
              break;
        
        case "fridayCloseTime":
              this.workingHours[9] = val.value;  
              break;
        
        case "saturdayOpenTime":
              this.workingHours[10] = val.value;  
              break;

        case "saturdayCloseTime":
              this.workingHours[11] = val.value;  
              break;
        
        case "domingoOpenTime":
               this.workingHours[12] = val.value;  
                break;

        case "domingoCloseTime":
                this.workingHours[13] = val.value;  
                break;
        
      default:
        break;
    }

  }

  ngOnDestroy(){
      
    // this.userSub.unsubscribe();

  }
  

  hideAll()
  {
    this.accountIsActive = false;
    this.companyDetailsIsActive = false;
    this.addressIsActive = false;
    this.sectorIsActive = false;
    this.workingHoursIsActive = false;
  }


   /**
   * Handle Address drop downs
   * @it is used to get Values of the provinces, municipalities,bairro 
   * */ 
  
  getAllProvinces(){

    this.addressService.getPronvinces().subscribe((provinceResp:BasicModel[]) =>{
        
      this.provinces = provinceResp['data'];
      console.log(provinceResp);
    });

  }

  getMunicipalitybyProvinces(event){
    const provinciaID = event.target.value;

    this.businessProvince = event.target.options[event.target.options.selectedIndex].text;

    

    console.log(provinciaID);

    this.addressService.getMunicipalities(provinciaID).subscribe((municipalitiesResp:BasicModel[])=>{

      console.log(municipalitiesResp);
      
      this.municipalities = municipalitiesResp['data'];

    });

  }
  
  getNeighboorhoodsbyMunicipality(event){
    const municipality = event.target.value;

    this.businessMunicipality = event.target.options[event.target.options.selectedIndex].text;

    this.addressService.getNeighbourhood(municipality).subscribe((neighborhoodResp:BasicModel[])=>{

    console.log(neighborhoodResp);
  
    this.neighbourhoods = neighborhoodResp['data'];

    });

  }

  getStreetsbyNeighbourhood(event){
    this.neighborhood = event.target.value;
  
    this.businessNeighbourhood = event.target.options[event.target.options.selectedIndex].text;

    console.log(this.neighborhood);
    this.neighborhoodSelected = true;

    // this.streets =null;

  }


  /**
   * End of the Address drop downs 
   * */  

  // Map around  Me
  loadMiniMap()
  {
    this.mapBox.prepareMapAroundMe("map-around-me");
  }
  
  /**
   * METHODS TO UPDATE COMPANY Information
   * */ 

  OnUpdateCompanyDetails(companyEmail:any,companyName:any,website:any,phone1:any,phone2:any,description:any)
  {
    // company name
    let email = companyEmail.value;
    let company = companyName.value;
    let site = website.value;
    let pho_numb1 = phone1.value;
    let pho_numb2 = phone2.value;
    let about_Comp = description.value;

    console.log(description.value);

    this.companyservice.updateCompanyData(email,company,site,pho_numb1,pho_numb2,about_Comp,this.uploadedFile).subscribe((response)=>{


 
    });



    console.log(companyName.value);

  }

  onUpdateAddress()
  {
    console.log("Rua",  this.businessRuaID);
    // this.companyservice.updateCompanyAddress(this.businessRuaID).subscribe((resposeMessage:iMessage)=>{

    //   console.log(resposeMessage.message);
    //   this.isSuccess = resposeMessage.success;
    //   this.message = resposeMessage.message;
    //   this.fetchCompanyAddress();
      
    //   });

    this.toaster.show("success","Updated Successfully","Your information has been updated successfully",4000);
  }
  
  onUpdateCompanySector(sectorForm:NgForm){

    console.log(sectorForm);

  }

  onUpdateWorkHr(workHr:NgForm){

    // console.log(workHr);
    
    console.log(this.workingHours[0]);

    for (let i = 0; i < this.workingHours.length; i++) {
      
      console.log(i,this.workingHours[i]);
      
    }

  }
  

  // image Manipulation
  uploadImage(event)
 {
  this.uploadedFile =<File>event.target.files[0];
  // this.uploadedFile = event.target.files[0];

  this.previewImage(this.uploadedFile);
  this.fileName = this.uploadedFile.name;

 }
 

previewImage(files) {

    if (files.length === 0)
      return;
 
    var mimeType = files.type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "So podes usar images!";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
}

  

}
