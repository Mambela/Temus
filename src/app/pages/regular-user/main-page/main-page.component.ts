import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  showAuthform:boolean = false;
  isLoading:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
  
  toggleAuthForm()
  {
    this.showAuthform = !this.showAuthform;
    console.log(this.showAuthform);
  }

  onSignIn(signinForm:NgForm)
  {

  }

}
