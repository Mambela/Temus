import { Component, OnInit } from '@angular/core'; 
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'sigin-modal',
  template:`
    <div class="modal-dialog modal-md" role="document">
      <div class="modal-content">
        <div class="modal-header justify-content-center">
          <h5 class="modal-title">Iniciar Sessão</h5>
        </div>

        <div class="modal-body">
          <div class="container-fluid">
            <div class="row justify-content-center">
              <div class="col-8">
                <form action="#">
                  <div class="form-row">
                    <div class="form-group col-12">
                      <input
                        type="text"
                        name=""
                        id=""
                        class="form-control"
                        placeholder="Email"
                      />
                    </div>

                    <div class="from-group col-12">
                      <input
                        type="text"
                        name=""
                        id=""
                        class="form-control"
                        placeholder="Senha"
                      />
                    </div>

                    <div class="from-group col-12">
                      <button class="btn btn-primary w-100" type="submit">
                        Iniciar Sessão
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer justify-content-center">
          <a href="#">Criar uma conta</a>
        </div>
      </div>
    </div>
  `

})
export class SiginModalComponent {
  constructor(public activeModal: NgbActiveModal){}
}


@Component({
  selector: 'sigup-modal',
  template: `
    <div class="modal-dialog modal-md" role="document">
      <div class="modal-content">
        <div class="modal-header justify-content-center">
          <h5 class="modal-title">Comece já</h5>
        </div>

        <div class="modal-body">
          <div class="container-fluid">
            <div class="row justify-content-center">
              <div class="col-10">
                <form action="#">
                  <div class="form-row">
                    <div class="form-group col-12">
                      <label for="inputName">Seu nome</label>
                      <input
                        type="text"
                        name="#"
                        id="inputName"
                        class="form-control"
                        placeholder="nome"
                      />
                    </div>

                    <div class="form-group col-12">
                      <label for="inputEmail">Seu Email</label>
                      <input
                        type="email"
                        name=""
                        id="inputEmail"
                        class="form-control"
                      />
                    </div>

                    <div class="form-group col-12">
                      <label for="inputPassword">Senha</label>
                      <input
                        type="email"
                        name=""
                        id="inputPassword"
                        class="form-control"
                      />
                    </div>

                    <div class="form-group col-12">
                      <label for="inputPassword">Confirmar Senha</label>
                      <input
                        type="email"
                        name=""
                        id="inputPassword"
                        class="form-control"
                      />
                    </div>

                    <div class="form-group col-12">
                      <button type="submit" class="btn btn-primary w-100">
                        Criar Conta
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

        <div class="modal-footer justify-content-center">
          <a href="#" class="#"> Ainda não tenho uma conta </a>
        </div>
      </div>
    </div>
  </div>
  `

})
export class SigupModalComponent {
  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'sigin-sigup-header',
  templateUrl: './sigin-sigup-header.component.html',
  styleUrls: ['./sigin-sigup-header.component.scss']
})
export class SiginSigupHeaderComponent implements OnInit {

  constructor(private modalService:NgbModal,private config:NgbModalConfig) { }


  ngOnInit(): void { }
  
    openSignIn() {

      this.modalService.open(SiginModalComponent,{size:'md',backdropClass:'light-modal-backdrop',centered:true})
    }


    openSignUp()
    {
      this.modalService.open(SigupModalComponent,{size:'md',backdropClass:'light-modal-backdrop',centered:true})
    }

}