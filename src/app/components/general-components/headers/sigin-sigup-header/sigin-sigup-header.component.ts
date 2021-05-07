import { SigupModalComponent } from './../../modal/sigup-modal/sigup-modal.component';
import { SiginModalComponent } from './../../modal/sigin-modal/sigin-modal.component';
import { Component, OnInit } from '@angular/core'; 
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'sigin-sigup-header',
  templateUrl: './sigin-sigup-header.component.html',
  styleUrls: ['./sigin-sigup-header.component.scss']
})
export class SiginSigupHeaderComponent implements OnInit {

  constructor(private modalService:NgbModal,private config:NgbModalConfig) { }


  ngOnInit(): void { }
  
    openSignIn() {

      this.modalService.open(SiginModalComponent,{size:'md',backdropClass:'light-modal-backdrop',centered:true})
    }


    openSignUp()
    {
      this.modalService.open(SigupModalComponent,{size:'md',backdropClass:'light-modal-backdrop',centered:true})
    }

}