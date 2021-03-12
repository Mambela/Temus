import { TokenData } from './../data/models/supporting/token-model';
import { Injectable } from '@angular/core';
import { tokenName } from '@angular/compiler';

interface iTokenStructure{
    token_type:string;
    expires_in:number;
    access_token:string;
    refresh_token:string;
  };

@Injectable({
    providedIn: 'root'
})



export class STOREDCONSTANTS{

    public userRole:string;
    public userId:number;
    private URL: string = 'http://127.0.0.1:8000/api/';
    private resourceURL: string = 'http://127.0.0.1:8000/';
    //     private URL: string = 'http://10.0.0.112:8000/api/';
    // private resourceURL: string = 'http://10.0.0.112:8000/';
    public userToken: string;

    setToken:TokenData;


    constructor( ){

    }

    public BASEURL():string
    {
        
        return this.URL;
    }

    public getBASEURL(){

        return this.resourceURL;
    }
   
    getTokenData()
      {
    
        const tokenData:any= JSON.parse(localStorage.getItem("tokenData"));
        const expirationDate = new Date(new Date().getTime() + tokenData.expires_in * 10000);   

        this.setToken = new TokenData(tokenData.token_type,expirationDate,tokenData.access_token,tokenData.refresh_token);

        return this.setToken._access_token;
         
      }

}