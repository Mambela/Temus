

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
    telephone:number;
    description:string;



    constructor(stId:number,stDesignacao:string,stReferencia:string,stWebsite:string,
        stUserID:number,stLocalizacao:number,stLogo:string,stCategoriaID:number,
        stTipoID:number,stTelephone:number,stDescription:string)
        {
        
        this.id = stId;
        this.designacao = stDesignacao;
        this.referencia = stReferencia;
        this.website = stWebsite;
        this.user_id = stUserID;
        this.localizacao_id = stLocalizacao;
        this.logo = stLogo;
        this.categoria_id = stCategoriaID;
        this.tipo_id = stTipoID;
        this.telephone = stTelephone;
        this.description = stDescription;
        }

    
}