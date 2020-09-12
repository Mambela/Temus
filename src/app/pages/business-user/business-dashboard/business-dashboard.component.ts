import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-business-dashboard',
  templateUrl: './business-dashboard.component.html',
  styleUrls: ['./business-dashboard.component.scss']
})
export class BusinessDashboardComponent implements OnInit {
  
  _opened: boolean = true;
  _rightBarOpened: boolean = true;
  _docked: boolean = true;
  _Mode:string = 'push';
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
