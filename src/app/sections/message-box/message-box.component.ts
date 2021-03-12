import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnInit {

  @Input() message:string=" Processando !";
  @Input() success:boolean = true;
  @Input() processing:boolean = true;

  constructor(private modalService:NgbModal) { }

  ngOnInit(): void {
  }


  CloseModal()
  {

    this.modalService.dismissAll();
    }

}
