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
    public userToken: string;

    setToken:TokenData;


    constructor( ){

    }

    public BASEURL():string
    {
        
        return this.URL;
    }
   
    // getTokenData()
    //   {
    
    //     const tokenData:any= JSON.parse(localStorage.getItem("tokenData"));
    //     const expirationDate = new Date(new Date().getTime() + tokenData.expires_in * 10000);   

    //     // setToken = new TokenData(tokenData.token_type,expirationDate,tokenData.access_token,tokenData.refresh_token);

        
     
    //   }

}