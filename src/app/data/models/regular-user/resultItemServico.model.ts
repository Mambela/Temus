


export class ResultItemServico{

    public id:number;
    public empresaId:number;
    public name:string;
    public descricao:string;
    public disponibilidade:boolean;
    public imagem:string;
    public stock:number;
    public tipo:string;
    public categoria:string;
    public rating:number=0;
    public bairro:string;
    public empresa:string;
    public logo:string;
    public telefone:string;
    public lat:number;
    public lng:number;


    constructor(id:number,empresaId:number,name:string,imagem:string,tipo:string,
                categoria:string,bairro:string,empresa:string,logo:string,
                telefone:string,lat:number,lng:number)
    {
        this.id= id;
        this.empresaId =empresaId;
        this.name = name;
        this.imagem = imagem;
        this.tipo = tipo;
        this.categoria = categoria;
        this.bairro = bairro;
        this.empresa = empresa;
        this.logo = logo;
        this.telefone = telefone;
        this.lat = lat;
        this.lng = lng;
    }


}