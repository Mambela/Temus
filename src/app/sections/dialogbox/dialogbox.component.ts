import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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

  constructor(public activeModal: NgbActiveModal) { }

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


    this.activeModal.close();

  }

  onDeleteProduct(){

    console.log("Ready to delete Product! ");

  }

  onDeleteService()
  {

  }

  onUpdateProduct(){

  }

  onUpdateService()
  {

  }

}
