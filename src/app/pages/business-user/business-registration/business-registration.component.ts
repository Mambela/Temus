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
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap'
 
 
@Component({
  selector: 'app-business-registration',
  templateUrl: './business-registration.component.html',
  styleUrls: ['./business-registration.component.scss']
})
export class BusinessRegistrationComponent implements OnInit {

  //being used to assign a municipio for the rua 
  neighborhood:number=null;
  neighborhoodSelected= false;

  provinces:BasicModel[];
  municipalities:BasicModel[];
  neighbourhoods:BasicModel[];
  streets:BasicModel[];

  searching=false;
  searchingFailed = false;
  categorias:BasicModel[];



  closeResult = '';
  currentUserLocation:locationCoordinates; 
  private stepper: Stepper;


  constructor(private modalService: NgbModal,private mapboxmap: RegistrationMapService,
    private categoriaData:CategoriadataService,private addressService: AddressesService,
    private categoriaService:CategoryService) {
    }

  ngOnInit(): void {
  

    this.mapValues();
    this.getAllProvinces();

    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    })

  }

  /**
   * THis code handles the typeahead search to load the categoria 
   * **/ 
  resultformatter = ( categoria: {designacao: BasicModel}) => categoria.designacao;

  streetresultformatter = (StreetList: {street : BasicModel})=> StreetList.street;
  
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
  

  //This function belong to the Stepper
  next() {
    this.stepper.next();
  }

  previous(){
    this.stepper.previous();
  }

  onSubmit() {
    return false;
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

    console.log(provinciaID);

    this.addressService.getMunicipalities(provinciaID).subscribe((municipalitiesResp:BasicModel[])=>{

      console.log(municipalitiesResp);
      
      this.municipalities = municipalitiesResp['data'];

    });

  }
  
  getNeighboorhoodsbyMunicipality(event){
    const municipality = event.target.value;

    this.addressService.getNeighbourhood(municipality).subscribe((neighborhoodResp:BasicModel[])=>{

    console.log(neighborhoodResp);
  
    this.neighbourhoods = neighborhoodResp['data'];

    });

  }

  getStreetsbyNeighbourhood(event){
    this.neighborhood = event.target.value;

    console.log(this.neighborhood);
    this.neighborhoodSelected = true;

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
    });
  }

  // search = (text$: Observable<string>) => text$.pipe(
  //   debounceTime(200),
  //   distinctUntilChanged(),
  //   filter(term => term.length >= 2),
  //   map(term => states.filter(state => new RegExp(term, 'mi').test(state.name)).slice(0, 10))
  // )

}
