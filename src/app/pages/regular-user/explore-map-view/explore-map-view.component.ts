import { SearchService } from './../../../core-services/http-service/SearchService/search.service';
import { ExploremapService } from './../../../core-services/utility-service/exploremap.service';
import { Component, OnInit } from '@angular/core';
import { ResultItemLocal } from 'src/app/data/models/regular-user/resultItemLocal.model';

@Component({
  selector: 'app-explore-map-view',
  templateUrl: './explore-map-view.component.html',
  styleUrls: ['./explore-map-view.component.scss']
})
export class ExploreMapViewComponent implements OnInit {
  
  
  _opened: boolean = true;
  _rightBarOpened: boolean = false;
  _docked: boolean = false;
  _Mode:string = 'over';

  constructor(private _mapService:ExploremapService,private searchService :SearchService  ) {
    
   }

  ngOnInit(): void {
  
    this.displayMap();
    
  }

  _toggleSidebar() { 
    this._opened = !this._opened;
  }

  displayMap()
  {
    //this._mapService.getCurrentCoordinates('map');     
    this._mapService.getCurrentCoordinates('explore-map');
    this.populatemarkers();
  }
 


  test()
  {
    alert("");
  }

  populatemarkers()
  {
    this.searchService.searchLocal("","","","","","").subscribe((locations:ResultItemLocal[])=>{
        

      console.log(locations['data']);
      this._mapService.populateLocations(locations['data']);
    });
  }

}
