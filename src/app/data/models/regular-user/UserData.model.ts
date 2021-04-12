

export class UserData{
    
conta_id: number;
created_at: Date;
email: string;
email_verified_at:Date;
id:number;
perfil_id:number;
primeiro_nome:string;
sexo:string;
telefone:string;
ultimo_nome:string;
updated_at: Date;
username: string;

    constructor(stContaId:number,stCreatedAt:Date,stEmail:string,stEmail_verified_at:Date,stId:number
        ,stPerfil_Id:number,stP_Nome:string,stSexo:string,stTelefone:string,stU_nome:string,stUpdated_at:Date,stUsername:string)
    {
        this.conta_id = stContaId;
        this.created_at = stCreatedAt;
        this.email = stEmail;
        this.email_verified_at = stEmail_verified_at;
        this.id = stId;
        this.perfil_id = stPerfil_Id;
        this.primeiro_nome = stP_Nome;
        this.sexo = stSexo;
        this.telefone = stTelefone;
        this.ultimo_nome = stU_nome;
        this.updated_at = stUpdated_at
        this.username = stUsername;
    }

}