



export class ResultItemLocal{

    public id:number;
    public  name : string;
    public  imagem :string;
    public subcategoria :string;
    public  categoria :string;
    public  bairro :string;  
    public rua:String;
    public distance:number;
    public rating:number =0.0;
    public no_comments:number =0.0;
    public referencia:boolean;
    public  publico :boolean;
    public  empresa :string;
    public  logo :string;
    public  telephone :string;
    public  lat:number;
    public  lng:number;   

    constructor (id:number,name:string,imagem:string,subcategoria:string,categoria:string,
                bairro:string,referencia:boolean,publico:boolean,empresa:string,logo:string,telephone:string,lat:number,lng:number)
    {

        this.id= id;
        this.name= name;
        this.imagem = imagem;
        this.subcategoria = subcategoria;
        this.categoria = categoria;
        this.bairro = bairro;
        this.publico = publico;
        this.referencia = referencia;
        this.empresa = empresa;
        this.logo = logo;
        this.telephone = telephone;
        this.lat= lat;
        this.lng= lng;   

    }

}