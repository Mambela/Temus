import { Component, OnInit } from '@angular/core'; 
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'sigin-sigup-header',
  templateUrl: './sigin-sigup-header.component.html',
  styleUrls: ['./sigin-sigup-header.component.scss']
})
export class SiginSigupHeaderComponent implements OnInit {

  constructor() { }


  ngOnInit(): void {
  }
  
    open() {
    }

  // openSigupModal() {
  //   this.modalService.open(this.sigupModal);
  // }
}