import { AuthService } from './../../../../core-services/http-service/Authentication Service/auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sigup-modal',
  templateUrl: './sigup-modal.component.html',
  styleUrls: ['./sigup-modal.component.scss']
})
export class SigupModalComponent implements OnInit {

  constructor(private auth:AuthService) { }
  
  success:boolean = false;
  errorMessage:string = "";
  registering:boolean = false;


  ngOnInit(): void {
  }

  onCreateUserAccount(userAccountForm:NgForm)
  {
      if(userAccountForm.invalid)
      {  
          return ;
      }

      //const produto_description = addProdutoForm.value.prod_descript;

      
      const p_nome = userAccountForm.value.first_name;
      const l_nome = userAccountForm.value.last_name;
      const email = userAccountForm.value.email;
      const password = userAccountForm.value.password;
      const c_password = userAccountForm.value.confirm_password;
        
       userAccountForm.reset;

      this.auth.userSignUp(p_nome,l_nome,email,password,c_password).subscribe(response =>{
        
        console.log(response);

      },(error=>{
          
            // this.errorMessage = 

        })
      );


  }

}
