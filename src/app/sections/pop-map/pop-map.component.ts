import { locationCoordinates } from './../../data/models/supporting/mapcoordinates';
import { RegistrationMapService } from './../../core-services/utility-service/registration-map.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pop-map',
  templateUrl: './pop-map.component.html',
  styleUrls: ['./pop-map.component.scss']
})
export class PopMapComponent implements OnInit {



  constructor(private mapservice:RegistrationMapService) { }

  ngOnInit(): void {

    this.mapservice.coordinatesUpdated.subscribe((coordinates:locationCoordinates) =>{

      console.log('Longitude ->',coordinates.lat,coordinates.lng);

    });

  }

}
