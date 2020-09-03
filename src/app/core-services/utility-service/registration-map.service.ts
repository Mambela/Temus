import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { rejects } from 'assert';
// import { resolve } from 'dns';
// import {environment} from "../../../environments/environment"


@Injectable({
  providedIn: 'root'
})
export class RegistrationMapService {

  map: mapboxgl.Map;

  style = 'mapbox://styles/jacklumba/ckelwsq9p1qnu19lqlu43x6us'
  lat;
  long;
  zoom =12;
  container = '';
  //28.118429595033746 -25.97241723427076

  


  constructor() { 
      
    // this. getUserLocation();
       (mapboxgl as any).accessToken = environment.mapbox.accessToken;
  }

  

  showPosition(position)
  {

    this.long = position.coords.longitude;
    this.lat = position.coords.latitude;
    
    if(!!this.long && !!this.lat)
    {
        this.buildMap();
    }
   
 
  }


   private buildMap(){
     
   
        this.map = new mapboxgl.Map({
    
          container:this.container,
          style: this.style,
          zoom:this.zoom,
          center:[this.long,this.lat]      
        });
    
        
       this.map.addControl(new mapboxgl.NavigationControl());
      
      
       this.createMarker(this.long,this.lat);

        // marker.on('dragend', onDragEnd);

       
        
  }

  createMarker(lng,lat)
  {
    var marker = new mapboxgl.Marker({
      draggable: true
      })
      .setLngLat([lng,lat])
      .addTo(this.map);

      marker.on('drag',()=>{


        console.log(marker.getLngLat());
      })


  }
 
  getUserLocation(container){
    
    this.container = container

      if(navigator.geolocation){
      
          navigator.geolocation.getCurrentPosition((position)=>{
            this.showPosition(position);
            this.lat = position.coords.latitude;
            this.long = position.coords.longitude;
              

          });
        }
        else{
        
          alert("Your location could not be lcoated");
        }

  }


  OldgetUserLocation(){

    // return new Promise((resolve,rejects)=>
      
    // navigator.permissions ?

    // navigator.permissions.query({
    //   name:'geolocation'
    // }).then(permission =>
    //   permission.state === "granted"
    //   ? alert("granted!")
    //   : resolve(null)
    //   ) :

    //   rejects(new Error("Permission API is not supported"))
      
    // )  
  }

}
