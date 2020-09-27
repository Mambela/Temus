export class EmpresaProdutoModel{

    id:number;
    stock:number;
    preco:number;
    imagem:string;
    descricao:string;
    visualisar_preco:number;
    estado:string;
    designacao:string;
    categoria:string;
    tipo:string;
    created_at:Date;
    


    constructor(stID:number,stStock:number,stPreco:number,stEstado:string,stCategoria:string,stDesignacao:string,stTipo:string,stDescricao:string,stDate:Date)
    {
        this.id= stID;
        this.stock = stStock;
        this.preco = stPreco;
        this.estado = stEstado;
        this.designacao = stDesignacao;
        this.categoria = stCategoria;
        this.tipo = stTipo;
        this.descricao = stDescricao;
        this.created_at = stDate;
    }

}