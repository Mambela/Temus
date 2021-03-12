import { error } from 'protractor';
import { CompanyServicesService } from './../../core-services/http-service/business/Servicos services/services.service';
import { HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageBoxComponent } from './../message-box/message-box.component';
import { ProductsService } from './../../core-services/http-service/business/Produto Services/products.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.scss']
})
export class DialogboxComponent implements OnInit {
  
  @Input() message:string;
  @Input() purpose:string;
  @Input() id:number;
  @Input() source:string;
  @Input() object_name:string;

  constructor(public activeModal: NgbActiveModal,private productService:ProductsService,private modalService:NgbModal,private router:Router,
              private servicoService:CompanyServicesService) { }

  ngOnInit(): void {
  }


  onLoadDialogBox(){

    if(this.purpose === "Delete"){

    }

  }

  onConfirmOperation()
  {

    if((this.purpose === "Delete") && (this.source ==="produto"))
    {
      this.onDeleteProduct();
    }
    

    if((this.purpose === "Delete") && (this.source ==="serviço"))
    {
      this.onDeleteService();
    }
    


    this.activeModal.close();

  }

  onDeleteProduct(){

    
    const modalRef = this.modalService.open(MessageBoxComponent,{size:'md',backdropClass:'light-modal-backdrop',centered:true}) ;

                  
     this.productService.removeProduto(this.id).subscribe((event)=>{
          
              if(event.type === HttpEventType.UploadProgress){
                console.log('Upload Progress: '+ Math.round(event.loaded / event.total * 100) + '%');
                // this.uploadPercentage = Math.round(event.loaded / event.total * 100);
                console.log(event.type);
              }
          
              modalRef.componentInstance.message = "Produto excluido !";
              modalRef.componentInstance.processing = false;
              modalRef.componentInstance.success = true;
              
          
              this.onLoadEmpresaProdutos();
          
      },deleteError=>{
              
              // modalRef.componentInstance.message="Ocorreu um erro !";
              modalRef.componentInstance.message = deleteError.error.message;
              modalRef.componentInstance.processing = false;
              modalRef.componentInstance.success = false;
          
        });


  }

  onLoadEmpresaProdutos()
  {
   
    //this.productService.getAllCompanyProducts().subscribe();      

    this.router.navigate(['/business-products']);
    
    
  }

  onDeleteService()
  {

    const modalRef = this.modalService.open(MessageBoxComponent,{size:'md',backdropClass:'light-modal-backdrop',centered:true}) ;

    this.servicoService.removeServico(this.id).subscribe((event)=>{

      
      if(event.type === HttpEventType.UploadProgress){
        console.log('Upload Progress: '+ Math.round(event.loaded / event.total * 100) + '%');
        // this.uploadPercentage = Math.round(event.loaded / event.total * 100);
        console.log(event.type);
      }
  
      modalRef.componentInstance.message = "Serviço excluido !";
      modalRef.componentInstance.processing = false;
      modalRef.componentInstance.success = true;


    },deleteError=>{


      modalRef.componentInstance.message = deleteError.error.message;
      modalRef.componentInstance.processing = false;
      modalRef.componentInstance.success = false;

    });

  }

  onUpdateProduct(){

  }

  onUpdateService()
  {

  }

}
