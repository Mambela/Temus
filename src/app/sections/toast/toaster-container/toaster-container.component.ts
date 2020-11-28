import { ToasterService } from './../toaster.service';
import { Toast } from './../toast.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toaster-container',
  templateUrl: './toaster-container.component.html',
  styleUrls: ['./toaster-container.component.scss']
})
export class ToasterContainerComponent implements OnInit {

  toasts:Toast[]=[];


  constructor(public toaster: ToasterService) { }

  ngOnInit(): void {

    this.toaster.toast$
    .subscribe(toast => {
      this.toasts = [toast, ...this.toasts];
      setTimeout(() => this.toasts.pop(), toast.delay || 6000);
    });

  }

  remove(index: number) {
    this.toasts = this.toasts.filter((v, i) => i !== index);
    // this.toasts.splice(index, 1);
  }

}
