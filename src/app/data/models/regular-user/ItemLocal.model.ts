import { BasicModel } from './../supporting/basic-model.model';

import { Image } from "./Image.model";


export class ItemLocal{
    
    id: number;
    designacao: string;
    telephone: string;
    sobre:string;
    categoria:BasicModel;
    tipo:BasicModel;
    localizacao_id:number;
    referencia: number;
    publico:number;
    latitude: number;
    longitude: number;
    imagem:string;
    images:Image[];
    tags:BasicModel[];

    constructor(_id: number,_designacao: string,_telephone: string,_categoria: BasicModel,_tipo:BasicModel,
                _localizacao_id:number,_referencia: number,_publico:number,_latitude: number,_longitude: number,_imagem:string )
    {

        this.id = _id;
        this.designacao = _designacao;
        this.telephone =_telephone;
        this.categoria = _categoria;
        this.imagem = _imagem;
        this.tipo= _tipo;
        this.localizacao_id =   _localizacao_id;
        this.referencia = _referencia;
        this.publico = _publico;
        this.latitude = _latitude;
        this.longitude = _longitude;

    }
}