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
  
  map: mapboxgl.Map;

  style = 'mapbox://styles/jacklumba/ckelwsq9p1qnu19lqlu43x6us'
  private lat;
  private lng;
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

      marker.on('drag',()=>{


      //  console.log(marker.getLngLat());
        this.lng = marker.getLngLat().lng;
        this.lat = marker.getLngLat().lat;
     
       

        this.emmitCoord();
        
      });


  }
 
  getUserLocation(container){
    
    this.container = container

      if(navigator.geolocation){
      
          navigator.geolocation.getCurrentPosition((position)=>{
            this.showPosition(position);
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
              

          });
        }
        else{
        
          alert("Your location could not be lcoated");
        }

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

  


}
