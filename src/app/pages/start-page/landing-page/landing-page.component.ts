import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {


    const btnSignIn = document.querySelector('#btn-signIn') as HTMLButtonElement;
    const btnSignUp = document.querySelector('#btn-signUp') as HTMLButtonElement;

    const formSignIn = document.querySelector('.sign-in') as HTMLDivElement;
    const formSignUp = document.querySelector('.sign-up') as HTMLDivElement;


    btnSignIn.addEventListener('click', (e: Event) => {
      e.preventDefault();

      let signInVisibility = formSignIn.style.visibility;
      
      if(signInVisibility == 'hidden'){
        formSignIn.style.visibility = "visible";
      } else{
        formSignIn.style.visibility = "hidden";
      }

    });

    btnSignUp.addEventListener('click', (e: Event) => {
      e.preventDefault();

      let signUpVisibility = formSignUp.style.visibility;
      
      if(signUpVisibility == 'hidden'){
        formSignUp.style.visibility = "visible";
      } else{
        formSignUp.style.visibility = "hidden";
      }

    })
  }

}
