

export class UserAddress{


    public comuna:string;
    public municipio:string;
    public provincia:string;
    public distance:number;


    constructor(_comuna:string,_municipio:string,_provincia:string,_distance:number){
        
        this.comuna =_comuna;
        this.municipio =_municipio;
        this.provincia = _provincia;
        this.distance = _distance;
    }


}