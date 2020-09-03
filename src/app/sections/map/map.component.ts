import { RegistrationMapService } from './../../core-services/utility-service/registration-map.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(private map: RegistrationMapService) { }

  ngOnInit(): void {
    
    this.map.getUserLocation('map');
    
   
  
  }

}
