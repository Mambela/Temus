import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-business-service',
  templateUrl: './business-service.component.html',
  styleUrls: ['./business-service.component.scss']
})
export class BusinessServiceComponent implements OnInit {
  
  _opened: boolean = true;
  _rightBarOpened: boolean = false;
  _docked: boolean = true;
  _Mode:string = 'push';

  serviceCount:number=0;
  selectedCategoria:string="Categoria";
  selectedTipo:string="Tipo";

  constructor() { }

  ngOnInit(): void {
  }

  _toggleSidebar() { 
    this._opened = !this._opened;
  }
  _toggleRightbar()
  {
    this._rightBarOpened = !this._rightBarOpened;
  }

}
