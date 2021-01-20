import { Router } from '@angular/router';
import { HttpEventType } from '@angular/common/http';
import { CompanyServicesService } from '../../../core-services/http-service/business/Servicos services/services.service';
import { debounceTime, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { BasicModel } from './../../../data/models/supporting/basic-model.model';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriaProductService } from 'src/app/core-services/DataService/categoria/categoriaProductdata-service.service';

@Component({
  selector: 'app-add-new-service',
  templateUrl: './add-new-service.component.html',
  styleUrls: ['./add-new-service.component.scss']
})
export class AddNewServiceComponent implements OnInit {



  availability:string="Indisponivel";
  servicePrice_availability:string="Ocultar";


  //Needed for image opeartion 
  logoName:string;
  imagePath;
  imgURL: any="../../../../assets/images/placeholder.png";
  message: string;
  fileName:string='Choose file';
  uploadedFile:File=null;
  uploadingProgress:number;

  listOfService_Categories:BasicModel[];
  listOfService_Types:BasicModel[];

  //user selected product
  selectedService:BasicModel;
  selectedServiceName:string;
  serviceID:number;
  serviceCategoriaID:number=null;

  //Selected categoria 
  selectedCategoria:BasicModel;
  selectedCompanyService:BasicModel;

  serviceCreated:string;

   //SEARCH PARAMETER FOR CATEGORIA
   searchingFailed:boolean=false; 
   searching:boolean = false;

  //changeSwitch
  ServicoAvailable:boolean=false;
  priceDisplay:boolean=false;

  //Saving Services
  isSavingService:boolean;



  constructor(private modalService:NgbModal,private serviceData:CategoriaProductService,private companyServices:CompanyServicesService, private activeModal:NgbActiveModal,private router:Router) { }

  ngOnInit(): void {

    this.onLoadCategories();
  }

  resultformatter = ( categoria: {designacao: BasicModel}) => categoria.designacao;

  categoriaSearch = (text$: Observable<string>)=> 
    text$.pipe(
      
    );
  

    serviceSearch =(text$:Observable<string>)=>text$.pipe( 
      debounceTime(300),
      distinctUntilChanged(),
      tap(()=>this.searching = true),
      switchMap(term=>
        this.companyServices.prepareProductToSearch(term,this.serviceCategoriaID).pipe(
            tap(()=> this.searchingFailed = false),
            catchError(()=>{
              this.searchingFailed = true;

              return of([]);
            })),
            ),
            tap(() =>  this.searching = false)

    );

  /**
   * On Categoria Change and Type Change
   * */ 

   onLoadCategories()
   {
     this.listOfService_Categories = this.serviceData.getServiceCategoria();
     console.log(this.serviceData.getServiceCategoria());
   }

  userSelectedCategoria(event: any) {
    const categoria:BasicModel = event.item;
    
    this.serviceCategoriaID = categoria.id;
  
    // this.onCategoriaChange(categoria.id);
      
  }

  userSelectedService(event: any) {
    const categoria:BasicModel = event.item;
    
    this.serviceID = categoria.id;
    this.selectedServiceName = categoria.designacao;
  
    console.log(categoria);
  
    // this.onCategoriaChange(categoria.id);
  
    // this.onCategoriaChange(event);
  
      
  }

  onCategoriaChange(event)
  {  

    //because its an event we need to extract the value 
    const categoriaID = event.target.value;

    console.log(event.target.value);

    this.serviceCategoriaID = categoriaID;
      
    this.companyServices.getServiceTypeByCategory(categoriaID).subscribe((respType)=>{
  
      this.listOfService_Types = respType['data'];
          
    });

  }
  
  openCreateService(content)
  {
    this.modalService.open(content,{size:'md',backdropClass:'light-modal-backdrop',centered:false});
  }
  /***
   * Create a new service
   * */  

  onAddToMyServices(serviceForm:NgForm){

     
    const description = serviceForm.value.prod_descript;
    const price = serviceForm.value.prod_Price;

    let choicePrice:number=0;

    if(this.priceDisplay)
    {
      choicePrice = 1
    }
    
    

    this.companyServices.associateServiceToEmpresa(this.serviceID,this.ServicoAvailable,this.uploadedFile,
          price,description,choicePrice).subscribe((event)=>{

            if(event.type === HttpEventType.UploadProgress){
              console.log('Upload Progress: '+ Math.round(event.loaded / event.total * 100) + '%');
              // this.uploadPercentage = Math.round(event.loaded / event.total * 100);
            }
            else if(event.type == HttpEventType.Response){
              console.log(event);
              console.log(event.body['data']['id']);
      
              if(event.body['data']['id'])
              {
                // this.uploadMessageType = "success";
                this.serviceCreated = "Servico adicionado aos seus Serviços.";
                console.log(
                 "Servico adicionado aos seus Serviços.")
              }
              else{
                
                console.log("occorreo um erro ao salvar o serviço.");
              }
            }

            this.isSavingService = false;

            this.activeModal.close();

          });

  }

  



  /**
   * HANdle File opeartion 
   * 
   * */  
  uploadImage(event)
  {
   this.uploadedFile =<File>event.target.files[0];
   // this.uploadedFile = event.target.files[0];
 
   this.previewImage(this.uploadedFile);
   this.fileName = this.uploadedFile.name;
 
  }
 
  onAvailabilityChange(val:any){
     
   if(val)
   {
     this.ServicoAvailable = false;
     this.availability = "Indisponivel";
   }
   else{
     this.ServicoAvailable = true;
     this.availability = "Disponivel";
   }
  
    
 }
 
 onDisplayPrice(val:any)
 {
 
   if(val)
   {
     this.priceDisplay = false;
     this.servicePrice_availability = "Ocultar";
   }
   else{
     this.priceDisplay = true;
     this.servicePrice_availability = "Mostrar";
   }
   console.log("Display price", this.priceDisplay);
 
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

  
  /**==============================================================================================================================================
   * 
   * Methods for the Modal 
   * **/  

  onCreateService(createServiceForm:NgForm)
  {
      console.log(createServiceForm);

      const category = createServiceForm.value.creatServiceCategoria;
      const type = createServiceForm.value.creatServiceType;
      const serviceName =createServiceForm.value.serviceName;

      this.isSavingService = true;  

      createServiceForm.resetForm;

      this.companyServices.createNewService(serviceName,"none",category,type).subscribe((saveResp)=>{

        if(saveResp['data']['designacao'])
        {
          this.serviceCreated = "Serviço " + saveResp['data']['designacao'] + "  adicionado com successo ";
        }
        this.isSavingService = false;

      });


  }
}
