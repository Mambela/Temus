import { BusinessPageComponent } from './../business-page/business-page.component';
import { DatasharingService } from './../../../core-services/DataService/share/datasharing.service';
import { TemusMessage } from './../../../data/models/supporting/respMessages.model';
import { AuthService } from './../../../core-services/http-service/auth.service';
import { SavingLoaderComponent } from './../../../sections/loaders/saving-loader/saving-loader.component';
import { streetModel } from './../../../data/models/supporting/street-model.model';
import { AddressesService } from './../../../core-services/http-service/addresses-service.service';
import { CategoriadataService } from './../../../core-services/DataService/categoria/categoriadata-service.service';
import { CategoryService } from './../../../core-services/http-service/category-service.service';
import { BasicModel } from './../../../data/models/supporting/basic-model.model';
import { locationCoordinates } from './../../../data/models/supporting/mapcoordinates';
import { PopMapComponent } from './../../../sections/pop-map/pop-map.component';
import { RegistrationMapService } from './../../../core-services/utility-service/registration-map.service';
import { Component, OnInit } from '@angular/core';
import {Observable, of} from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter, switchMap, tap, catchError } from 'rxjs/operators';
import Stepper from 'bs-stepper';
import {NgbModal, ModalDismissReasons, NgbModalConfig, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap'
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { HttpEventType } from '@angular/common/http';
 
 
@Component({
  selector: 'app-business-registration',
  templateUrl: './business-registration.component.html',
  styleUrls: ['./business-registration.component.scss']
})
export class BusinessRegistrationComponent implements OnInit {
  
  

  /**
   * User Details
  */
  businessName:string;
  businessEmail:string;businessPassword:string;businessPasswordConfir:string;
  businessPhoneNumber1:number; businessPhoneNumber2:number; businessWebsite:string;
  // businessCountry:string;
  businessCategoriaID:number = 0;
  businessCategoriaDesignacao:string ="";

  isCompleted:boolean = false;
  hasErrors:boolean = false;

  businessRuaID:number = 0;
  businessRuaDesignacao:string ="";

  businessProvince:string;businessMunicipality:string; businessNeighbourhood:string; 

  /**
   * End of user Details
   * */ 

    //Needed for image operation 
  logoName:string;
  imagePath;
  imgURL: any="../../../../assets/images/placeholder.png";
  message: string;
  fileName:string='Choose file';
  uploadedFile:File=null;
  uploadingProgress:number;
  /**
   * 
   * */ 
  

  //being used to assign a municipio for the rua 
  neighborhood:number=null;
  neighborhoodSelected= false;

  provinces:BasicModel[];
  municipalities:BasicModel[];
  neighbourhoods:BasicModel[];
  streets:streetModel;


  //USed for the search of Categoria
  searching=false;
  searchingFailed = false;
  selectedCategoria:BasicModel;

 
  
  
  userSelectedCategoria(event: any) {
    const categoria:BasicModel = event.item;
    
    this.businessCategoriaID = categoria.id;
    this.businessCategoriaDesignacao = categoria.designacao;

    
  }

  userSelectedRua(event:any){

    const ruaObj:streetModel = event.item;
    
    this.businessRuaID = ruaObj.id;
    this.businessRuaDesignacao = ruaObj.rua;
    
  }
  
  

  closeResult = '';
  currentUserLocation:locationCoordinates; 
  private stepper: Stepper;

  sampleCategoria:string;

   


  constructor(private modalService: NgbModal,private mapboxmap: RegistrationMapService,
    private categoriaData:CategoriadataService,private addressService: AddressesService,
    private categoriaService:CategoryService,private modalConfig:NgbModalConfig,private router: Router,
    private authenticationService:AuthService,private receiveName:DatasharingService) {

      modalConfig.backdrop = 'static' ;
      modalConfig.keyboard = false;
       
    }

  ngOnInit(): void {
  

    this.mapValues();
    this.getAllProvinces();
    this.getBusinessName();
    
    

    console.log("business name",this.businessName);

    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    })

  }

  /**
   * THis code handles the typeahead search to load the categoria 
   * **/ 
  resultformatter = ( categoria: {designacao: BasicModel}) => categoria.designacao;

  streetresultformatter = (StreetList: {rua : streetModel})=> StreetList.rua;
  
   categoriaSearch = (text$: Observable<string>)=> 
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      
      tap(()=> this.searching = true),
      switchMap(term => 
         this.categoriaService.searchCategoria(term).pipe(
           tap(() => this.searchingFailed = false),
            catchError(() => {
              this.searchingFailed = true;
              return of([]);
            })),
          ),
          tap(() =>this.searching =false)
    )

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
  

/**
 * Form Management
 * */  
 onfinaliseBusinessInfo(setbusinessname)
 {
   
   
  // if((setbusinessname != null && this.businessCategoriaDesignacao != null) || (setbusinessname != null &&  this.businessCategoriaDesignacao =="" )) 
  if((this.businessCategoriaDesignacao != "") && (setbusinessname != null))
  {
    this.businessName = setbusinessname;
    this.next(); 
  }
  else{
    
  }

 }

 onfinaliseAccountData(stEmail,stPassword,stPasswordConfirm)
 {
    if( (stEmail != null ) && (stPassword != null) && (stPasswordConfirm != null))
    {
      if(stPassword == stPasswordConfirm)
        {
          this.next();
        }  
        else{
          // Password dont match
        }
      
    }
    else{
      //Passwords empty 
    }


 }

 onfinaliseContactDetais(stBusinessNumber1)
 {
    if(stBusinessNumber1 != null)
    {
      //Password 
      this.next();
    }
    else{
      //Password empty
    }
 }

 onfinaliseAddress(){

  if(this.businessRuaDesignacao != null || this.businessRuaDesignacao != "")
  {
    this.next();
  }

 }

 


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

 //This function belong to the Stepper
  next() {
    this.stepper.next();
  }

  previous(){
    this.stepper.previous();
  }
  
  showSavingLoader()
  {
    
    this.modalService.open(SavingLoaderComponent,{ariaLabelledBy: 'modal-basic-title',size:'md',backdropClass:'light-modal-backdrop',centered:true}).result.then((result) => {
      
    });
  }


  closeLoading(){
 //   this.activeModal.close()
   this.modalService.dismissAll();
  }



  onSubmit(businessRegisterForm:NgForm) {

    let respMessage:any;
    //this.router.navigate(['/business-dashboard']);
    
    this.isCompleted = false;
    this.showSavingLoader();

    // step 1
    const _businessName = this.businessName;
    const _businessCategory = this.businessCategoriaID;
  


    // step 2
    const _email = this.businessEmail;
    const _password = this.businessPassword
    const _password_confirmation =  this.businessPasswordConfir;

    // step 3
    const _phone1 = this.businessPhoneNumber1;
    const _phone2 = this.businessPhoneNumber2;
    const _web = this.businessWebsite;
    const _locationID = this.businessRuaID;
    const _logo ='';
    const _lng = this.currentUserLocation.lng;
    const _lat =  this.currentUserLocation.lng;


    this.authenticationService.userSignUp(_businessName,_email,_password,_password_confirmation,
                                          _phone1,_phone2,_web,_locationID,_businessCategory,_lat,_lng,this.uploadedFile).subscribe((event)=>{

      
      
      
      

        if(event.type === HttpEventType.UploadProgress)
        {
          console.log('Upload Progress: '+ Math.round(event.loaded / event.total * 100) + '%');
          this.uploadingProgress = Math.round(event.loaded / event.total * 100);
        }
        else if(event.type == HttpEventType.Response){
          
            respMessage = event.body;
            console.log(respMessage.message);
            this.isCompleted = true;
            this.hasErrors = false;
            this.closeLoading();
        }

      },(errorMessage)=>{
        this.hasErrors = true;
          
        this.isCompleted = true;
        this.closeLoading();
        console.log(errorMessage);
    // 
    });

    console.log(businessRegisterForm);
   
  }

  //Reroute to the 
  continueActivity()
  {
    this.router.navigate(['/business']);
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
  
  

   
  
  //Function to open the map in a modal. 

  expandMap()
  {
    this.modalService.open(PopMapComponent,{ariaLabelledBy: 'modal-basic-title',size:'xl'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  mapValues()
  {
    this.mapboxmap.getUserLocation('sm-map');

    this.mapboxmap.coordinatesUpdated.subscribe((coordinates: locationCoordinates)=>{
        
                this.currentUserLocation = coordinates;
                console.log('Values',coordinates.lat,coordinates.lng);
    });
  }

  getBusinessName()
  {
    this.receiveName.companyName.subscribe((name:string)=>{
      this.businessName = name;

      
    });
  }

  // search = (text$: Observable<string>) => text$.pipe(
  //   debounceTime(200),
  //   distinctUntilChanged(),
  //   filter(term => term.length >= 2),
  //   map(term => states.filter(state => new RegExp(term, 'mi').test(state.name)).slice(0, 10))
  // )

}
