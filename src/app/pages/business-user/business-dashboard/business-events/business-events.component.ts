import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-business-events',
  templateUrl: './business-events.component.html',
  styleUrls: ['./business-events.component.scss']
})
export class BusinessEventsComponent implements OnInit {
  

  _opened: boolean = true;
  _rightBarOpened: boolean = false;
  _docked: boolean = true;
  _Mode:string = 'push';
  isAuthenticated = false;



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
