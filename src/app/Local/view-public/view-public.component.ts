import { ExploremapService } from './../../core-services/utility-service/exploremap.service';
import { UserComment } from './../../data/models/regular-user/UserComment.model';
import { DatePipe } from '@angular/common'
import { STOREDCONSTANTS } from './../../module/constants.service';
import { ResultItemLocal } from 'src/app/data/models/regular-user/resultItemLocal.model';
import { ItemLocal } from './../../data/models/regular-user/ItemLocal.model';
import { LocalService } from './../../core-services/OtherService/local.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './../../core-services/http-service/Authentication Service/auth.service';
import { UserData } from './../../data/models/regular-user/UserData.model';
import { TokenData } from './../../data/models/supporting/token-model';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';

interface ilocalAddress{
  street:string;
  bairro:string;
}

@Component({
  selector: 'app-view-public',
  templateUrl: './view-public.component.html',
  styleUrls: ['./view-public.component.scss']
})

export class ViewPublicComponent implements OnInit {


  localAddress:ilocalAddress;
  avgRating:number=0;
  aLocal:ItemLocal;
  localsCloseBy:ResultItemLocal[];
  similarLocation:ResultItemLocal[];
  
  tipo:number;
  distanceToLocal:string="";
  
  private userSub: Subscription;
  tokenData:TokenData;
  private tokenSub: Subscription;
  private userDataSub:Subscription;
  openReview:boolean=false;
  
  localComments:UserComment[];
  hideNewComment:boolean=true;
  comentCount:number =0;

  private localId:number;

  isAuthenticated = false;

  private lat:number;
  private lng:number;

  _baseUrl:string;

   // companyData:CompanyData;
   userData:UserData;

  constructor(private authService:AuthService,config: NgbRatingConfig,private route:ActivatedRoute,
              private localService:LocalService,private storedValues:STOREDCONSTANTS,private mapService:ExploremapService) {
    config.max = 5;
    config.readonly = true;
   }

  ngOnInit(): void {
        
    this.localId = +this.route.snapshot.queryParamMap.get("local");
  
    this._baseUrl = this.storedValues.getBASEURL() +"storage/provided/locations/image/";

    this.verifyAuthentication();
    this.getCloseLocations();
    this.getlocalDetails();
    this.getLocalComments();
    this.getLocalAddress();

   
  }
  

  newCommentHandler(newComment:UserComment)
  {
    //newCommentHandler
    //Adding the Comment at the beginnig of the array.

      
      this.localService.postNewComment(newComment.comment,this.localId,newComment.rating).subscribe((response)=>{

        this.localComments.unshift(newComment);
        this.comentCount +=1; 
        this.hideNewComment = false;                    

      });

  }

  avaliar()
  {
    this.openReview = !this.openReview;


    // if(this.openReview)
    // {
    //   this.getLocalComments();
    // }
  }

  verifyAuthentication():void
  {
    


    this.userDataSub = this.authService.userDataSubj.subscribe((userdata:UserData)=>{
  

        
        
        this.isAuthenticated = !userdata ? false : true;

        if(this.isAuthenticated)
        {
          this.userData = userdata;

        }
        else{

    
          
        }

    });




    this.tokenSub = this.authService.tokenDataSubj.subscribe((company:TokenData)=>{

      this.tokenData = company;

   
    });




  }

  getCloseLocations()
  {
    var lat = this.route.snapshot.queryParamMap.get("lat");
    var lng = this.route.snapshot.queryParamMap.get("lng");
    let localId:number = +this.route.snapshot.queryParamMap.get("local");

    this.localService.getLocalsCloseby(localId,lat,lng).subscribe((local:ResultItemLocal[])=>{

      this.localsCloseBy = local;
      
  
    });

   
  }


  getDistanceToLocal()
  {
    var lat = this.route.snapshot.queryParamMap.get("lat");
    var lng = this.route.snapshot.queryParamMap.get("lng");


    
    if(navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition((position)=>{
        
         var distance = this.mapService.calculateDistanceBetweenTwoPoints(+lat,+lng,+position.coords.latitude,+position.coords.longitude);
        //var distance = this.mapService.calculateDistanceBetweenTwoPoints(+lat,+lng,-8.813056,13.224523);
       
        //-8.789158, , 

        console.log(distance);

        if(distance > 1)
        {
          var newDistance = distance.toFixed(1);
            this.distanceToLocal = "A "+ newDistance +" km";
        }
        else{

          var newDistance = distance.toFixed(2);

          this.distanceToLocal = "A "+ +newDistance * 100 +" metros";

        }


      });
    }
 
  }

  getlocalDetails()
  {
        
    this.localService.getLocalData(this.localId).subscribe((respLocal:ItemLocal)=>{
    
    this.aLocal = respLocal;
      

    this.getSameLocals(respLocal.tipo[0].id);
      
    });


  }

  getLocalAddress()
  {
    this.localService.getLocalAddress(this.localId).subscribe((address:ilocalAddress)=>
    {
        this.localAddress = address; 
    });

    this.getDistanceToLocal();
    
  }

  getLocalComments()
  {
     let sum = 0;
       this.localService.getLocalComments(this.localId).subscribe((comments:UserComment[])=>{
      
       this.localComments = comments;
       this.comentCount = comments.length;


       if(comments.length > 0)
      {
         for(let i =0; i < comments.length; i++)
         {
           sum += comments[i].rating;
         }
         
         this.avgRating = sum/comments.length;
         this.avgRating = +this.avgRating.toFixed();
      }
      
      

    });
  }

  getSameLocals(tipoId)
  {
    var referenceCount = 5 - this.localsCloseBy.length;

    this.localService.getSimilarLocation(tipoId,this.localId,referenceCount).subscribe((respdata:ResultItemLocal[])=>{
      

      this.similarLocation = respdata;
      console.log(respdata);

    });

  }

}
