import { STOREDCONSTANTS } from './../../module/constants.service';
import { ActivatedRoute } from '@angular/router';
import { ItemLocal } from './../../data/models/regular-user/ItemLocal.model';
import { LocalService } from './../../core-services/OtherService/local.service';
import { UserData } from './../../data/models/regular-user/UserData.model';
import { AuthService } from './../../core-services/http-service/Authentication Service/auth.service';
import { TokenData } from './../../data/models/supporting/token-model';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-private',
  templateUrl: './view-private.component.html',
  styleUrls: ['./view-private.component.scss']
})
export class ViewPrivateComponent implements OnInit {
  

  aLocal:ItemLocal;
  private userSub: Subscription;
  tokenData:TokenData;
  private tokenSub: Subscription;
  private userDataSub:Subscription;

  isAuthenticated = false;

  _baseUrl:string;
   userData:UserData;

  constructor(private authService:AuthService, private localService:LocalService,private route:ActivatedRoute,private storedValues:STOREDCONSTANTS) { }

  ngOnInit(): void {
    
    this._baseUrl = this.storedValues.getBASEURL() +"storage/provided/locations/image/";
    this.verifyAuthentication();
    this.onLoadStreetData();
  }
  

  verifyAuthentication():void
  {
    


    this.userDataSub = this.authService.userDataSubj.subscribe((userdata:UserData)=>{
  

        
        
        this.isAuthenticated = !userdata ? false : true;

        if(this.isAuthenticated)
        {
          this.userData = userdata;

        }
     

    });

    this.tokenSub = this.authService.tokenDataSubj.subscribe((company:TokenData)=>{

      this.tokenData = company;

   
    });




  }


  onLoadStreetData()
  {
    let localId:number = +this.route.snapshot.queryParamMap.get("local");

    this.localService.getLocalData(localId).subscribe((respLocal:ItemLocal)=>{
    
      this.aLocal = respLocal;
      console.log(respLocal);
      console.log(respLocal.categoria[0].designacao);
    });

  }

}
