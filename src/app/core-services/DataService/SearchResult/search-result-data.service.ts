import { ResultItemLocal } from './../../../data/models/regular-user/resultItemLocal.model';
import { Subject } from 'rxjs';
import { ResultItemServico } from './../../../data/models/regular-user/resultItemServico.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchResultDataService {

  constructor() { }

  //#Servico Results
  servicosResultSub = new Subject<ResultItemServico[]>();
  servicosResults:ResultItemServico[];
  
  //#Servico Results
  produtosResultSub = new Subject<ResultItemServico[]>();
  produtosResults:ResultItemServico[];


  //localResults
  localResutSub = new Subject<ResultItemLocal[]>();
  localResults:ResultItemLocal[];

  setServicoResult(_servicoResults)
  {
    this.servicosResults = _servicoResults;
    this.servicosResultSub.next(this.servicosResults.slice());
  }

  getServicoResult()
  {
    return this.servicosResults.slice();
  }

  setProdutoResult(_produtoResults)
  {
    this.produtosResults = _produtoResults;
    this.produtosResultSub.next(this.produtosResults.slice());
  }

  gettProdutoResult(): ResultItemServico[]
  {
    return this.produtosResults.slice();
  }

  

  setLocalResult(_localResults)
  {
    this.localResults = _localResults;
    this.localResutSub.next(this.localResults.slice());
  }

  getLocalResult() :ResultItemLocal[]
  {
    return this.localResults.slice();
  }

}
