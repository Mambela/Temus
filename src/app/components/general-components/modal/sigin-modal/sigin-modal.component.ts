import { AuthService } from './../../../../core-services/http-service/Authentication Service/auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'sigin-modal',
  templateUrl: './sigin-modal.component.html',
  styleUrls: ['./sigin-modal.component.scss']
})
export class SiginModalComponent implements OnInit {

  isSigningIn:boolean;

  constructor(private authservice:AuthService,private activeModal:NgbActiveModal) { }

  ngOnInit(): void {
  }

  onUserSignIn(signInForm:NgForm)
  {
    this.isSigningIn = true;

    console.log("SignIN Hit");
    const username =signInForm.value.username;
    const password = signInForm.value.password;

    console.log(username);
      

    this.authservice.companySingIn(username,password).subscribe((respData)=>{
      this.isSigningIn = false;

      this.activeModal.close();

      console.log('Response Sign in Data',respData)

    });

  }

}
