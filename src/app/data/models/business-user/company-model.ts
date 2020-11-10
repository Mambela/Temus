

export class CompanyData{

    id:number;
    designacao: string;
    referencia:string;
    website:string;
    user_id:number;
    localizacao_id:number;
    logo:string;
    categoria_id:number;
    tipo_id:number;
    telefone:number;
    description:string;
    created_at:Date;
    update_at:Date;
    email:string;
    telefone_2:number;
    



    constructor(stId:number,stDesignacao:string,stReferencia:string,stWebsite:string,
        stUserID:number,stLocalizacao:number,stLogo:string,stCategoriaID:number,
        stTipoID:number,stTelefone:number,stDescription:string,stEmail:string,stTelefone_2:number)
        {
        
        this.id = stId;
        this.designacao = stDesignacao;
        this.referencia = stReferencia;
        this.website = stWebsite;
        this.email = stEmail;
        this.user_id = stUserID;
        this.localizacao_id = stLocalizacao;
        this.logo = stLogo;
        this.categoria_id = stCategoriaID;
        this.tipo_id = stTipoID;
        this.telefone = stTelefone;
        this.telefone_2 = stTelefone_2;
        this.description = stDescription;
        }

    
}