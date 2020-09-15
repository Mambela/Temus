import { locationCoordinates } from './../../data/models/supporting/mapcoordinates';
import { environment } from './../../../environments/environment';
import { Injectable, Output, EventEmitter } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { rejects } from 'assert';
 
// import { resolve } from 'dns';
// import {environment} from "../../../environments/environment"

interface IchoosenCoordinates{
  
  lat: number;
  lng: number;

}
 
@Injectable({
  providedIn: 'root'
})
export class RegistrationMapService {

  //@Output()
  coordinatesUpdated = new EventEmitter<locationCoordinates>();
  distanceUpdated = new EventEmitter<any>();
  
  map: mapboxgl.Map;
  distance:number;
  //Style mapbox://styles/mapbox/streets-v11
  //style 2 mapbox://styles/jacklumba/ckelwsq9p1qnu19lqlu43x6us
  style = 'mapbox://styles/mapbox/streets-v11';
  private lat;
  private lng;
  private initLat;
  private iniLng;
  zoom = 13;
  container = '';
 

  constructor() { 
      
    // this. getUserLocation();
       (mapboxgl as any).accessToken = environment.mapbox.accessToken;
  }

  

  showPosition(position)
  {

        this.lng = position.coords.longitude;
        this.lat = position.coords.latitude;
        
        if(!!this.lng && !!this.lat)
        {
            this.buildMap();
        }
       
 
  }


  private buildMap(){
     
   
        this.map = new mapboxgl.Map({
    
          container:this.container,
          style: this.style,
          zoom:this.zoom,
          center:[this.lng,this.lat]      
        });
    
        
       this.map.addControl(new mapboxgl.NavigationControl());
      
       
      
       this.createMarker(this.lng,this.lat);

        // marker.on('dragend', onDragEnd);

       
        
  }

  createMarker(lng,lat)
  {
    var marker = new mapboxgl.Marker({
      draggable: true
      })
      .setLngLat([lng,lat])
      .addTo(this.map);


      //Allows the user to choose his coordinates.
      this.emmitCoord();
      marker.on('drag',()=>{


      //  console.log(marker.getLngLat());
        this.lng = marker.getLngLat().lng;
        this.lat = marker.getLngLat().lat;
     
      
        this.emmitCoord();
        this.emitDistance();
        
      });


  }
 
  getUserLocation(container){
    
    this.container = container

      if(navigator.geolocation){
      
          navigator.geolocation.getCurrentPosition((position)=>{
            this.showPosition(position);
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
            this.iniLng = position.coords.longitude;
            this.initLat = position.coords.latitude;
              

          });
        }
        else{
        
          alert("Your location could not be lcoated");
        }

  }
  




  // Calculate the distance between the user location and marker
  calculateDistanceToMarker():any
  {
    const R = 6371;
    let dLat = this.deg2rad(this.lat - this.initLat);
    let dlng = this.deg2rad(this.lng - this.iniLng);
      

    let a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) + 
    Math.cos(this.deg2rad(this.initLat)) * Math.cos(this.deg2rad(this.lat)) *
    Math.sin(dlng/2) * Math.sin(dlng/2);

    let c = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
    let d = R * c; 

    return d;

  }

  deg2rad(deg:any){

    return deg * (Math.PI/180);

  }

 

  /*
  * We nee to crete a method that will emmit an event everytime the coordinates change.
  *
  *
  * */ 
  emmitCoord()
  {
    
    let userCoordinates={
        lat:this.lat,
        lng:this.lng
    };
    this.coordinatesUpdated.emit(userCoordinates);


  }

  emitDistance()
  {

    let distance = this.calculateDistanceToMarker();
    let distanceMessage:String;

    if(distance > 0){
     
      distance = distance.toFixed(2);

      distanceMessage = "Marcador a "+ distance * 1000 +"  metros da sua localização atual ";

    }

    this.distanceUpdated.emit(distanceMessage);

  }
  

  getUserCurrentCoordiantes()
  {
      
  }

  



  


}
