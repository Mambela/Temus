import { Injectable } from '@angular/core';



@Injectable({
    providedIn: 'root'
})



export class STOREDCONSTANTS{

    public userRole:string;
    public userId:number;
    private URL: string = 'http://127.0.0.1:8000/api/';
    public userToken: string;


    constructor(){

    }

    public BASEURL():string
    {
        
        return this.URL;
    }



}