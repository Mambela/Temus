

export class EmpresaServicoModel{
    
    id:number;
    preco:number;
    imagem:string;
    descricao:string;
    estado:string;
    designacao:string;
    stock:number;
    categoria:string;
    tipo:string;
    created_at:Date


    constructor(stID:number,stPreco:number,stEstado:string,stCategoria:string,stDesignacao:string,stTipo:string,stDescricao:string,stDate:Date)
    {
        this.id= stID;
        this.preco = stPreco;
        this.estado = stEstado;
        this.designacao = stDesignacao;
        this.categoria = stCategoria;
        this.tipo = stTipo;
        this.descricao = stDescricao;
        this.created_at = stDate;
    }
}