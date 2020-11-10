import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Toast } from '../toast.interface';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent implements OnInit {
  
  @Input() toast: Toast;
  @Input() i: number;

  @Output() remove = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

}
