import { BasicModel } from './../../../../data/models/supporting/basic-model.model';
import { CompanyServicesService } from './../../../../core-services/http-service/business/services.service';
import { EmpresaServicoModel } from './../../../../data/models/business-user/empresa-servico.model';
import { CompanyService } from './../../../../core-services/http-service/company-service.service';
import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';

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

  isLoadingServices:boolean = false;

  serviceCount:number=0;
  selectedCategoria:string="Categoria";
  selectedTipo:string="Tipo";

  serviceTipo:BasicModel[];
  serviceCategoria:BasicModel[];
  serviceType:BasicModel[];
  

  listOfServices:EmpresaServicoModel[];

  serviceCountSubscrip:Subscription;
  constructor(private companyService:CompanyService,private companyManageService:CompanyServicesService) { }

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

    this.companyManageService.getServiceCategoria().subscribe((serviceCategoria:BasicModel[])=>{
              
      this.serviceCategoria = serviceCategoria['data'];
      console.log(serviceCategoria);

    });

  }

  onLoadCompanyServices()
  {
    this.isLoadingServices = true;
     
    this.companyManageService.getAllCompanyServices().subscribe((companyService:EmpresaServicoModel[])=>{
        
      this.listOfServices = companyService;
      this.isLoadingServices = false;

    });
  }

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
