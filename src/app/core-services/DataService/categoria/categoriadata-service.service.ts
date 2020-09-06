import { BasicModel } from './../../../data/models/supporting/basic-model.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriadataService {

  categoriaChanged = new Subject<BasicModel[]>();
  categoria:BasicModel[];

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
  

}
