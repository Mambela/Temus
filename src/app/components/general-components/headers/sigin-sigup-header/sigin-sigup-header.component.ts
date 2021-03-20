import { Component, OnInit, TemplateRef, ViewChild} from '@angular/core'; 
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'sigin-sigup-header',
  templateUrl: './sigin-sigup-header.component.html',
  styleUrls: ['./sigin-sigup-header.component.scss']
})
export class SiginSigupHeaderComponent implements OnInit {

  @ViewChild('siginModal') siginModal: TemplateRef<any>;
  @ViewChild('sigupModal') sigupModal: TemplateRef<any>;

  constructor(private modalService: NgbModal) { }


  ngOnInit(): void {
  }

  openSiginModal() {
    this.modalService.open(this.siginModal);
  }

  openSigupModal() {
    this.modalService.open(this.sigupModal);
  }
}
