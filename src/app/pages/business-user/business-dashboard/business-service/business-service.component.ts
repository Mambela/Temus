import { CategoriaDataServiceService } from './../../../../core-services/DataService/categoria/categoria-data-service.service';
import { CompanyInfoServiceService } from './../../../../core-services/http-service/business/Company Service/company-info-service.service';
import { AddNewServiceComponent } from '../../../../components/business-user/add-new-service/add-new-service.component';
import { HttpEventType } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { STOREDCONSTANTS } from './../../../../module/constants.service';
import { DialogboxComponent } from './../../../../sections/dialogbox/dialogbox.component';

import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { BasicModel } from './../../../../data/models/supporting/basic-model.model';
import { CompanyServicesService } from '../../../../core-services/http-service/business/Servicos services/services.service';
import { EmpresaServicoModel } from './../../../../data/models/business-user/empresa-servico.model';

import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { serialize } from 'v8';

@Component({
  selector: 'app-business-service',
  templateUrl: './business-service.component.html',
  styleUrls: ['./business-service.component.scss']
})
export class BusinessServiceComponent implements OnInit, OnDestroy {
  
  _opened: boolean = true;
  _rightBarOpened: boolean = false;
  _docked: boolean = true;
  _Mode:string = 'push';

  logoName:string;
  imagePath;
  imgURL: any="../../../../assets/images/placeholder.png";
  message: string;
  fileName:string='Choose file';
  uploadedFile:File=null;
  uploadingProgress:number;

  isLoadingServices:boolean = false;

  serviceCount:number=0;
  selectedCategoria:string="Categoria";
  selectedTipo:string="Tipo";

  serviceTipo:BasicModel[];
  serviceCategoria:BasicModel[];
  serviceType:BasicModel[];
  

  listOfServices:EmpresaServicoModel[];
  
  //Edit service
  serviceEdit:EmpresaServicoModel;
  serviceAvailable:boolean;
  servicePrice_availability
  serviceAvailability:string;
  priceDisplay:boolean;
  serviceCountSubscrip:Subscription;

  uploadPercentage:number;
  uploadMessage:string;
  uploadMessageType:string;
  isUploadingServico:boolean;


  constructor(private companyService:CompanyInfoServiceService,private companyManageService:CompanyServicesService,private modalService:NgbModal, 
              private config:NgbModalConfig,private storedConstant:STOREDCONSTANTS, private categoriaDTService:CategoriaDataServiceService) { }

  ngOnInit(): void {
    this.getServiceCount();
    this.onLoadServiceCategoria();
    this.onLoadCompanyServices();
  }

  getServiceCount()
  {
    this.serviceCountSubscrip = this.companyService.serviceCountSubj.subscribe((count)=>{
        
      this.serviceCount = count;
    });

  }

  onLoadServiceCategoria(){
  
    this.serviceCategoria = this.categoriaDTService.getServicoCategoria();
  

  }

  onLoadCompanyServices()
  {
    this.isLoadingServices = true;
     
    this.companyManageService.getAllCompanyServices().subscribe((companyService:EmpresaServicoModel[])=>{
        
      this.listOfServices = companyService;
      this.isLoadingServices = false;

    });
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

  /**
   * 
   * */ 
  onAddServico(){

    this.config.backdrop = true;
    const modalRef = this.modalService.open(AddNewServiceComponent,{size:'lg',backdropClass:'light-modal-backdrop',centered:false});

    modalRef.componentInstance.sourceParent = "Product";

  }
  
  onDeleteService(service:string,id:number){

    console.log(service);
    this.config.backdrop = 'static';
   

     

   const modalRef = this.modalService.open(DialogboxComponent,{size:'md',backdropClass:'light-modal-backdrop',centered:true}) ;

    modalRef.componentInstance.id = id;
    modalRef.componentInstance.source="serviço";
    modalRef.componentInstance.message = 'Tem certeza de que deseja excluir o serviço ';
    modalRef.componentInstance.object_name = service;
    modalRef.componentInstance.purpose= "Delete";
  
    
  }

  openEditServico(content,service:EmpresaServicoModel)
  {

    this.modalService.open(content,{size:'lg',backdropClass:'light-modal-backdrop',centered:false});

    this.serviceEdit = service;


      if(service.imagem === "no_service.jpg"){

        this.imgURL = this.storedConstant.getBASEURL()+"storage/"+service.imagem;
  
      }
      else{
        
        this.imgURL =this.storedConstant.getBASEURL()+"storage/provided/empresa/"+this.storedConstant.userId+"/servicos/"+service.imagem;

      }


      if(service.estado ==='true')
      {
        this.serviceAvailable = true;
        this.serviceAvailability = "Disponivel";
      }else{
        this.serviceAvailable = false;
        this.serviceAvailability = "Indisponivel";
      }

  }

  onUpdateService(updateForm:NgForm)
  {
    let description = updateForm.value.service_descript;
    let preco = updateForm.value.service_Price;

   
    if(this.uploadedFile === null)
     {
       
        //update the service with old image
        this.companyManageService.updateEmpresaServico(this.serviceEdit.imagem,null,preco,this.serviceAvailable,this.serviceEdit.id,description)
        .subscribe((event)=>{

          if(event.type === HttpEventType.UploadProgress){
            console.log('Upload Progress: '+ Math.round(event.loaded / event.total * 100) + '%');
            this.uploadPercentage = Math.round(event.loaded / event.total * 100);
          }
          else if(event.type == HttpEventType.Response){
            console.log(event);
            console.log(event.body['data']['id']);

            if(event.body['data']['id'])
            {
              this.uploadMessageType = "success";
              this.uploadMessage = "Serviço actualizado com successo!";
              this.isUploadingServico = false;
            }
            else{
              this.uploadMessageType = "unsuccess";
              this.uploadMessage = "Occorreo um erro ao actualizar o serviço.";
            }
          }

        });

     }
     else {     
      
      //update the service with a new Image

      this.companyManageService.updateEmpresaServico(null,this.uploadedFile,preco,this.serviceAvailable,this.serviceEdit.id,description)
        .subscribe((event)=>{

          if(event.type === HttpEventType.UploadProgress){
            console.log('Upload Progress: '+ Math.round(event.loaded / event.total * 100) + '%');
            this.uploadPercentage = Math.round(event.loaded / event.total * 100);
          }
          else if(event.type == HttpEventType.Response){
            console.log(event);
            console.log(event.body['data']['id']);

            if(event.body['data']['id'])
            {
              this.uploadMessageType = "success";
              this.uploadMessage = "Serviço actualizado com successo!";
              this.isUploadingServico = false;
            }
            else{
              this.uploadMessageType = "unsuccess";
              this.uploadMessage = "Occorreo um erro ao actualizar o serviço.";
            }
          }
        
        
        
        });

       
     }

  }

  closeModal()
  {
    this.modalService.dismissAll();
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

  onAvailabilityChange(val:any){
    
    if(val)
    {
      this.serviceAvailable = false;
      this.serviceAvailability = "Indisponivel";
    }
    else{
      this.serviceAvailable = true;
      this.serviceAvailability = "Disponivel";
    }
   
     
  }

  /**
   * Methods to manage the change in the service categories and types. 
   * **/
  onCategoriaChange(event)
  {
   
    
      if(event.target.value === "reset")
      {
          this.selectedCategoria = "Categoria";
          this.selectedTipo ="Tipo";
          this.onLoadCompanyServices();
      }
      else{
        this.selectedCategoria = event.target.options[event.target.options.selectedIndex].text;

        const categoriaId = event.target.value;

        this.companyManageService.getServiceTypeByCategory(categoriaId).subscribe((tipoResp:BasicModel[])=>{
      
          this.serviceTipo = tipoResp['data'];

        });

        this.onloadServicesByParameters(categoriaId,"categoria");

      }

  }
 
  onTipoChange(event)
  {
      
    this.selectedTipo = event.target.options[event.target.options.selectedIndex].text;

    if(event.target.value === "reset"){
      
                
      this.selectedTipo ="Tipo";
      
      this.onCategoriaChange(event);

    }
    else{
      
      this.onloadServicesByParameters(+event.target.value,"tipo");
        
    }


  }

  onloadServicesByParameters(stcategoria:number,choice:string)
  {  
        this.companyManageService.getCompanyServicesByChoice(stcategoria,choice).subscribe((responseService:EmpresaServicoModel[])=>{
              
          this.listOfServices = responseService;

        });
  }


  _toggleSidebar() { 
    this._opened = !this._opened;
  }
  _toggleRightbar()
  {
    this._rightBarOpened = !this._rightBarOpened;
  }
  ngOnDestroy(){

    // this.serviceCountSubscrip.unsubscribe;
  }

}
