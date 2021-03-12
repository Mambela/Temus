import { MessageBoxComponent } from './../../../sections/message-box/message-box.component';
import { CategoriaDataServiceService } from './../../../core-services/DataService/categoria/categoria-data-service.service';
import { CompanyInfoServiceService } from './../../../core-services/http-service/business/Company Service/company-info-service.service';
import { HttpEventType } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, switchMap, tap, catchError, filter, flatMap } from 'rxjs/operators';
import { CategoriaProductService } from './../../../core-services/DataService/categoria/categoriaProductdata-service.service';
import { ProductsService } from '../../../core-services/http-service/business/Produto Services/products.service';
import { BasicModel } from './../../../data/models/supporting/basic-model.model';
import { NgbModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { CategoryService } from 'src/app/core-services/http-service/business/Category Services/category-service.service';

@Component({
  selector: 'app-add-new-product-service',
  templateUrl: './add-new-product-service.component.html',
  styleUrls: ['./add-new-product-service.component.scss']
})
export class AddNewProductServiceComponent implements OnInit {
  
  @Input() sourceParent:string;

  /**
   * List of labels for Products and Services
   * **/ 
  labeltitle:string;
  
  btnAddLabl:string;
  descripTitle:string;
  decisionChoice:boolean;
  availability:string="Indisponivel";
  productPrice_availability:string="Ocultar";
  
  //Needed for image operation 
  logoName:string;
  imagePath;
  imgURL: any="../../../../assets/images/placeholder.png";
  message: string;
  fileName:string='Choose file';
  uploadedFile:File=null;
  uploadingProgress:number;

  listOf_Categories:BasicModel[];
    listOfProd_Types:BasicModel[];
 
  

  //user selected product
  selectedProduct:BasicModel;
  selectedProductName:string;

  //Selected categoria 
  selectedCategoria:BasicModel;
  selectedCompanyService:BasicModel;

  productCategoriaID:number;
  productCreated:string;
  
  productID:number;

  //SEARCH PARAMETER FOR CATEGORIA
  searchingFailed:boolean=false; 
  searching:boolean = false;

  //changeSwitch
  produtoAvailable:boolean=false;
  priceDisplay:boolean=false;

  //Product cateogry Search
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  constructor(private modalService:NgbModal, private companyservice:CompanyInfoServiceService,private productservice:ProductsService,
              private cateProData:CategoriaDataServiceService,private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.handleSource();

  }
  
  // Search Product category
resultformatter = ( categoria: {designacao: BasicModel}) => categoria.designacao;

  categoriaSearch = (text$: Observable<string>)=> 
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      
      tap(()=> this.searching = true),
      switchMap(term => 
         this.categoryService.getProdutoCategoria_byParam(term).pipe(
           tap(() => this.searchingFailed = false),
            catchError(() => {
              this.searchingFailed = true;
              return of([]);
            })),
          ),
          tap(() =>this.searching =false)
    );
    
    @ViewChild('instance', {static: true}) instance: NgbTypeahead;

 

  productSearch =(text$:Observable<string>)=>text$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    tap(()=>this.searching = true),
    switchMap(term=>
      this.productservice.prepareProductToSearch(term,this.productCategoriaID).pipe(
           tap(() => this.searchingFailed = false),
           catchError(()=>{
             this.searchingFailed = true;

             return of([]);
           })),
           ),
           tap(() => this.searching = false)
  );

handleSource()
{
   
  this.onLoadCategories();  

}

userSelectedCategoria(event: any) {
  const categoria:BasicModel = event.item;
  
  this.productCategoriaID = categoria.id;

  this.onCategoriaChange(categoria.id);
    
}

userSelectedProduct(event: any) {
  const categoria:BasicModel = event.item;
  
  this.productID = categoria.id;
  this.selectedProductName = categoria.designacao;

  console.log(categoria);

    
}

openCreateService_or_Product(content)
{
   this.modalService.open(content,{size:'md',backdropClass:'light-modal-backdrop',centered:false});

}

/**
 * Changes in Categoria  and Type
 * 
 * */ 
onCategoriaChange(event:any){
  
  const categoria:number = event.target.value;

  this.productCategoriaID = categoria;

  this.productservice.getProdutoTipoByCategoria(categoria).subscribe((respData:BasicModel[])=>{
          this.listOfProd_Types = respData['data'];
          console.log(respData);
  });

}

 onAddToMyProduto(addProdutoForm:NgForm)
 {  


    //Prepare the modal
    
    const messageModalRef = this.modalService.open(MessageBoxComponent,{size:'md',backdropClass:'light-modal-backdrop',centered:true}) ;

    // this.isUploadingProduto = true;
    const product_to_Add = this.productID;

    const produto_description = addProdutoForm.value.prod_descript;
    const produto_price = addProdutoForm.value.prod_Price;
    const produtoStock = addProdutoForm.value.prod_Stock; 
    
    
    const produto_availability = this.produtoAvailable;




    this.productservice.associateProdutoToEmpresa(product_to_Add,produto_availability,this.uploadedFile,
                                                  produto_price,produto_description,produtoStock, this.priceDisplay)
    .subscribe((event)=>{
          
      if(event.type === HttpEventType.UploadProgress){
        console.log('Upload Progress: '+ Math.round(event.loaded / event.total * 100) + '%');
        // this.uploadPercentage = Math.round(event.loaded / event.total * 100);
      }
      else if(event.type == HttpEventType.Response){
          
        messageModalRef.componentInstance.message = "Produto adicionado com successo! ";
        messageModalRef.componentInstance.processing = false;
        messageModalRef.componentInstance.success = true;
          
      }
    },addingProductError=>{

        messageModalRef.componentInstance.message = "Ocorreu um erro ao adicionar o produto. '<br>' Por tente mais tarde!";
        messageModalRef.componentInstance.processing = false;
        messageModalRef.componentInstance.success = false;

    });
   
  
 }
/**
 * Handle Service and Product
 * Load Categories and Types
 * **/ 
onCreateProduct(createNew:NgForm){

  const prodName = createNew.value.prodName;
  const prodCategoria = createNew.value.creatCategoria;
  const prodtype = createNew.value.creatType;


  //Prepare the modal
  const messageModalRef = this.modalService.open(MessageBoxComponent,{size:'md',backdropClass:'light-modal-backdrop',centered:true}) ;
  
    console.log(createNew.value.creatCategoria);


    this.productservice.createNewProduct(prodName,"",prodCategoria,prodtype).subscribe((saveResponse)=>{
        
      if(saveResponse['data']['designacao'])
      {
        this.productCreated = "Produto  " + saveResponse['data']['designacao'] + "  criado com successo ";
        
        messageModalRef.componentInstance.message = this.productCreated;
        messageModalRef.componentInstance.success = true;
        messageModalRef.componentInstance.processing = false;

      }

    },handleError=>{

      messageModalRef.componentInstance.message = "Occorreu um erro ao adicionar o produto! ";
      messageModalRef.componentInstance.success = false;
      messageModalRef.componentInstance.processing = false;

    });
}

onLoadCategories()
{

  this.listOf_Categories = this.cateProData.getProdutoCategoria();

  console.log(this.listOf_Categories);
   
}
 

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
    this.produtoAvailable = false;
    this.availability = "Indisponivel";
  }
  else{
    this.produtoAvailable = true;
    this.availability = "Disponivel";
  }
 
   
}

onDisplayPrice(val:any)
{

  if(val)
  {
    this.priceDisplay = false;
    this.productPrice_availability = "Ocultar";
  }
  else{
    this.priceDisplay = true;
    this.productPrice_availability = "Mostrar";
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



}
