import { UserAddress } from './../../../data/models/regular-user/UserAddress.model';
import { AddressesService } from './../../../core-services/http-service/business/Addresses Service/addresses-service.service';
import { RegistrationMapService } from './../../../core-services/utility-service/registration-map.service';
import { locationCoordinates } from './../../../data/models/supporting/mapcoordinates';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unathenticated-nav-bar',
  templateUrl: './unathenticated-nav-bar.component.html',
  styleUrls: ['./unathenticated-nav-bar.component.scss']
})
export class UnathenticatedNavBarComponent implements OnInit {
  
  lat:number;
  lng:number;
  emptyLocation:boolean;
  UserLocation:UserAddress;

  currentUserLocation:locationCoordinates; 

  constructor(private mapboxmap: RegistrationMapService,private addressService: AddressesService) { }

  ngOnInit(): void {

    this.userCoordinates();
    this.loadUserAddress();

    console.log("Initialisation Hit");

  }


  userCoordinates()
  {

    if(navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition((position)=>{
          
        console.log(position);
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;

        console.log(" Latittude" + this.lat);
        console.log(" Longittude" + this.lng);

      });
    }

  }

  loadUserAddress()
  {
    
    this.lat = -8.951322;
    this.lng = 13.174164;


    this.addressService.getUserAddress(this.lat,this.lng).subscribe((currentAddress:UserAddress)=>{

      console.log(currentAddress);

      if(currentAddress[0].comuna == null)
        {
          console.log("You are out of the country");
        }
        else
        {
          console.log(currentAddress[0].comuna);
          this.UserLocation =currentAddress[0];
        }

    });
  }



}
