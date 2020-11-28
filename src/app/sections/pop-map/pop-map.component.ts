import { locationCoordinates } from './../../data/models/supporting/mapcoordinates';
import { RegistrationMapService } from './../../core-services/utility-service/registration-map.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pop-map',
  templateUrl: './pop-map.component.html',
  styleUrls: ['./pop-map.component.scss']
})
export class PopMapComponent implements OnInit {

 distanceToMarker:number;
 distanceMessage:string =" ";

  constructor(private mapservice:RegistrationMapService,public activeModal: NgbActiveModal) { }

  ngOnInit(): void {

    this.mapservice.coordinatesUpdated.subscribe((coordinates:locationCoordinates) =>{

      console.log('Longitude ->',coordinates.lat,coordinates.lng);

    });

    this.showDistanceToMarker();

  }

  showDistanceToMarker()
  {
    this.mapservice.distanceUpdated.subscribe((distanceMessage:string) =>{

        this.distanceMessage = distanceMessage;
        console.log(distanceMessage);

    });




  
    //Check if the distance is in KM or Meter
   



  }

}
