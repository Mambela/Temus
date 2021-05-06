


export class UserComment{

  // designacao:string;
  rating:number
  comment:string;
  created_at:Date;
  updated_at:Date;
  primeiro_nome:string;
  ultimo_nome :string;
  userId:number;

    constructor(stuserId:number,/*stDesignacao:string,*/ stRating:number,stComment:string,stCreate_at:Date,stPrimeiro_nome:string,stUltimo_nome:string)
    {
        this.userId = stuserId;
        // this.designacao = stDesignacao;
        this.rating = stRating;
        this.comment = stComment;
        this.created_at = stCreate_at;
        this.updated_at = stCreate_at;
        this.primeiro_nome = stPrimeiro_nome;
        this.ultimo_nome = stUltimo_nome;


    }

}