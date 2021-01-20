import { Subject } from 'rxjs';
import { BasicModel } from './../../../data/models/supporting/basic-model.model';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CategoriaDataServiceService {


//#region Variables

  //#region Produtos Variables

    produtosCategoriaSub = new Subject<BasicModel[]>();
    productCategoria:BasicModel[];
  //#endregion Servicos Variables
  
  //#region Servicos

    servicoCategoriaSub = new Subject<BasicModel[]>();
    servicoCategoria:BasicModel[];
  //#endregion

  //#region Locais

    localCategoriaSub = new Subject<BasicModel[]>();
    localCategoria:BasicModel[];
  //#endregion

  //#region  Eventos

  eventoCategoriaSub = new Subject<BasicModel[]>();
  eventoCategoria:BasicModel[];
  //#endregion  

  //#region Address  
    municipioSub = new Subject<BasicModel[]>();
    municipios:BasicModel[];
  //#endregion

  //#endregion
  constructor() { }


  //#region  Produto

  setProdutoCategoria(_produtosCateoria:BasicModel[])
  {
    this.productCategoria = _produtosCateoria;
    this.produtosCategoriaSub.next(this.productCategoria.slice());
  }

  getProdutoCategoria()
  {
    return this.productCategoria.slice();
  }

  //#endregion

  //#region Service
    
  setServicoCategoria(_servicoCategoria:BasicModel[])
  {
    this.servicoCategoria = _servicoCategoria;
    this.servicoCategoriaSub.next(this.servicoCategoria.slice());

  }

  getServicoCategoria()
  {
    return this.servicoCategoria.slice();
  }


  //#endregion

  //#region Event
    setEventoCategorias(_eventoCategoria:BasicModel[])
    {
      this.eventoCategoria = _eventoCategoria;
      this.eventoCategoriaSub.next(this.eventoCategoria.slice());      
    }

    getEventoCategorias()
    {
      return this.eventoCategoria.slice();
    }

  //#endregion

  //#region Local
        setLocalCategorias(_localCategoria:BasicModel[])
        {
          this.localCategoria = _localCategoria;
          this.localCategoriaSub.next(this.localCategoria.slice());
        }

        getLocalCategorias()
        {
          return this.localCategoria.slice();
        }
  //#endregion

  
  //#region Address
  
  setMunicipio(_municipio:BasicModel[])
  {
    this.municipios = _municipio;
    this.municipioSub.next(this.municipios.slice());
  }

  getMunicipio()
  {
    return this.municipios.slice();
  }


    
  //#endregion

}
