import { RegistrationMapService } from './../../../../core-services/utility-service/registration-map.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-business-content-page',
  templateUrl: './business-content-page.component.html',
  styleUrls: ['./business-content-page.component.scss']
})
export class BusinessContentPageComponent implements OnInit {

  _opened: boolean = false;
  _rightBarOpened: boolean = false;
  _docked: boolean = true;
  _Mode:string = 'push';

  constructor(private mapBox: RegistrationMapService) { 
    
  }

  ngOnInit(): void {
    this.loadMiniMap();
  }
  
  _toggleSidebar() { 
    this._opened = !this._opened;
  }
  _toggleRightbar()
  {
    this._rightBarOpened = !this._rightBarOpened;
  }

  loadMiniMap()
  {
    this.mapBox.prepareMapAroundMe("map-around-me");
  }

}
