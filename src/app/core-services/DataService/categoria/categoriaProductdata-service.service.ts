import { BasicModel } from '../../../data/models/supporting/basic-model.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaProductService {

  categoriaChanged = new Subject<BasicModel[]>();
  categoria:BasicModel[];

  typeChanged = new Subject<BasicModel[]>();
  types:BasicModel[];

  constructor() { }

  setCategoriaDetail(stCategoria:BasicModel[])
  {
    this.categoria = stCategoria;
    this.categoriaChanged.next(this.categoria);
  }

  getCategoria()
  {
      return this.categoria;
  }
  
  setTypeDetails(stType:BasicModel[]){

    this.types = stType;
    this.typeChanged.next(this.types);

  }

  getType(){

    return this.types;
  }

}
