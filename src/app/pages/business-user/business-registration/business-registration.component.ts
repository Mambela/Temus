import { PopMapComponent } from './../../../sections/pop-map/pop-map.component';
import { RegistrationMapService } from './../../../core-services/utility-service/registration-map.service';
import { Component, OnInit } from '@angular/core';
import Stepper from 'bs-stepper';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-business-registration',
  templateUrl: './business-registration.component.html',
  styleUrls: ['./business-registration.component.scss']
})
export class BusinessRegistrationComponent implements OnInit {
  
  closeResult = '';

  private stepper: Stepper;

 constructor(private modalService: NgbModal,private map: RegistrationMapService) {

  }

  ngOnInit(): void {

    this.map.getUserLocation('sm-map');

    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    })

  }

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

}
