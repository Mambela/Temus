import { STOREDCONSTANTS } from './../../module/constants.service';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import { ResultItemLocal } from 'src/app/data/models/regular-user/resultItemLocal.model';


@Injectable({
  providedIn: 'root'
})
export class ExploremapService {

  map: mapboxgl.Map;
  zoom:number = 13;
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

    this.lat =-8.823549;
    this.lng =13.240714;


      if(navigator.geolocation)
      {
        navigator.geolocation.getCurrentPosition((position)=>{
          // this.showPosition(position);
          this.displayExplorerMap(container,position)
         

          // this.lat = position.coords.latitude;
          // this.lng = position.coords.longitude;
        });
      }
    

      console.log("Coordinates",this.lat,this.lng);
      //, 13.28822

  }

  public displayExplorerMap(container,position)
  {
    console.log(" The container "+ container);
    // this.imageBaseUrl = this.storedValues.BASEURL()+"/storage/provided/locations/image/"

    /*
    *  This coordinates below are to be uncommented when the the application is to be tested in Luanda
    */
    // this.lat = position.coords.latitude;
    // this.lng = position.coords.longitude;

    // console.log(this.lat,this.lng);

    this.map = new mapboxgl.Map({
      container:container,
      style:this.style,
      zoom:this.zoom,
      center:[this.lng,this.lat]      
          
      
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
  

  createMarker(location:ResultItemLocal)
  {

    var markerPopup =` <img src="`+this.imageBaseUrl+location.imagem+`" height="120px" class="card-img-top rounded" alt="...">
      <div class="card-img-overlay "> 
          <div class="d-flex justify-content-end">  
               <span class="bg-success rounded-local rounded px-1"> 
                  <p class="card-text align-text-bottom checkIn text-white"><i class="fas fa-check-circle"></i> 4500 (check ins)</p>
               </span>
          </div>
        </div>

        <div>
        <h5 class="card-title text-dark text-truncate ">`+location.name+`</h5>
        <p class="text-secondary location-text"><i class="fas fa-map-marker-alt text-success"></i> `+location.bairro+`, Luanda</p>
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


}
