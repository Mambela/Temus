
  
import { STOREDCONSTANTS } from './../../module/constants.service';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import { ResultItemLocal } from 'src/app/data/models/regular-user/resultItemLocal.model';


@Injectable({
  providedIn: 'root'
})
export class ExploremapService {


  R:number = 6371;
  map: mapboxgl.Map;
  zoom:number = 11.15;
  style ='mapbox://styles/mapbox/streets-v11';
  // style = 'mapbox://styles/jacklumba/ckelwsq9p1qnu19lqlu43x6us';
  imageBaseUrl:string ="";

  lat:number;
  lng:number;

  constructor(private storedValues:STOREDCONSTANTS) {

    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
      
     this.imageBaseUrl = this.storedValues.getBASEURL()+"storage/provided/locations/image/";
   }

  public getCurrentCoordinates(container)
  {

    // this.lat =-8.823549;
    // this.lng =13.240714;


      if(navigator.geolocation)
      {
        navigator.geolocation.getCurrentPosition((position)=>{
          // this.showPosition(position);
          
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.displayExplorerMap(container,position)
          console.log(position);
        });
      }
    

      console.log("Coordinates",this.lat,this.lng);
      //, 13.28822

  }

  public displayExplorerMap(container,position)
  {
    console.log(" The container "+ position);
    // this.imageBaseUrl = this.storedValues.BASEURL()+"/storage/provided/locations/image/"

    /*
    *  This coordinates below are to be uncommented when the the application is to be tested in Luanda
    */
    // this.lat = position.coords.latitude;
    // this.lng = position.coords.longitude;
    //-8.851818,13.246383,12.75z/data=!4m
    // console.log(this.lat,this.lng);

    this.map = new mapboxgl.Map({
      container:container,
      style:this.style,
      zoom:this.zoom,
      center:[this.lng,this.lat]      
      // center:[13.246383,-8.851818]
          
      
    })

    this.map.addControl(new mapboxgl.NavigationControl());

  }


  public populateLocations(Locations:ResultItemLocal[])
  {
    Locations.forEach(Location => {
       
      this.createMarker(Location);    

    });
    //var marker = new mapboxgl.Marker().setLngLat([])
  }  
  

  
  calculateDistanceBetweenTwoPoints(latPoint1:number,lngPoint1:number,latPoint2:number,lngPoint2:number):number
  {

    console.log(latPoint1,lngPoint1,latPoint2,lngPoint2);

    let dLat = this.deg2rad(latPoint1 - latPoint2);
    let dlng = this.deg2rad(lngPoint1 - lngPoint2);



    let a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) + 
    Math.cos(this.deg2rad(latPoint2)) * Math.cos(this.deg2rad(latPoint1)) * 
    Math.sin(dlng/2) * Math.sin(dlng/2);

    let c = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
    let distance = this.R * c; 



    return distance;
  }



  createMarker(location:ResultItemLocal)
  {

    var markerPopup =`<img src="`+this.imageBaseUrl+location.imagem+`" height="120px" class="card-img-top rounded" alt="...">
      <div class="card-img-overlay "> 
          <div class="d-flex justify-content-end">  
               <span class="bg-success rounded-local rounded px-1"> 
                  <p class="card-text align-text-bottom checkIn text-white"><i class="fas fa-check-circle"></i> 4500 (check ins)</p>
               </span>
          </div>
        </div>
        <div>
        <h5 class="card-title text-dark text-truncate mb-n1">`+location.name+`</h5>
        <p class="text-secondary location-text"><i class="fas fa-map-marker-alt text-success"></i> `+location.bairro+`, Luanda</p>
        <a  (click)="test()"> Visitar Pagina </a>
        </div>`;
    
  var popup = new mapboxgl.Popup().setHTML(markerPopup);

  popup.addClassName('bg-warning')

    var marker = new mapboxgl.Marker({
      color:"#4CAF50",
      draggable: false
      })
      .setLngLat([location.lng,location.lat])
      .setPopup(popup)
      .addTo(this.map);



  }
  

  deg2rad(deg:any){

    return deg * (Math.PI/180);

  }

}
