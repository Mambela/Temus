import { Component, OnInit } from '@angular/core';
import Stepper from 'bs-stepper';

@Component({
  selector: 'app-business-registration',
  templateUrl: './business-registration.component.html',
  styleUrls: ['./business-registration.component.scss']
})
export class BusinessRegistrationComponent implements OnInit {

  private stepper: Stepper;

  next() {
    this.stepper.next();
  }

  previous(){
    this.stepper.previous();
  }

  onSubmit() {
    return false;
  }

  // constructor() { }

  ngOnInit(): void {

    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    })

  }

}
