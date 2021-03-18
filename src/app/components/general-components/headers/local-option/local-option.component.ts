import { ExploremapService } from './../../../../core-services/utility-service/exploremap.service';
import { UserAddress } from './../../../../data/models/regular-user/UserAddress.model';
import { AddressesService } from './../../../../core-services/http-service/business/Addresses Service/addresses-service.service';
import { RegistrationMapService } from './../../../../core-services/utility-service/registration-map.service';
import { locationCoordinates } from './../../../../data/models/supporting/mapcoordinates';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'local-option',
  templateUrl: './local-option.component.html',
  styleUrls: ['./local-option.component.scss']
})
export class LocalOptionComponent implements OnInit {
  lat: number;
  lng: number;
  emptyLocation: boolean = false;UserLocation: UserAddress;

  currentUserLocation: locationCoordinates;

  constructor(private mapboxmap: RegistrationMapService, private _mapService: ExploremapService, private addressService: AddressesService) { }

  ngOnInit(): void {

    this.userCoordinates();
    this.loadUserAddress();
    this._mapService.getCurrentCoordinates('');

    console.log("Initialisation Hit")
  }


  userCoordinates() {

    if( navigator.geolocation ) {
      navigator.geolocation.getCurrentPosition((position) => {

        console.log(position);
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;

        console.log(" Latitude" + this.lat);
        console.log(" Longitude" + this.lng);
        
      })

    }
  }

  loadUserAddress() {

    this.lat = -8.951322;
    this.lng = 13.174164;

    this.addressService.getUserAddress(this.lat, this.lng).subscribe(
      (currentAddress: UserAddress) => {

        console.log(currentAddress);
        if(currentAddress[0].comuna == null) {
          console.log("You are out of the country");
        }
        else {
          console.log(currentAddress[0].comuna);this.UserLocation = currentAddress[0];
        }
        
      }
    )
  }

}
