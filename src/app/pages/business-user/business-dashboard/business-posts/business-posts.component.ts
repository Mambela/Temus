import { Component, OnInit } from '@angular/core';

const sampleList=[1,2,3,4,5,6];

@Component({
  selector: 'app-business-posts',
  templateUrl: './business-posts.component.html',
  styleUrls: ['./business-posts.component.scss']
})


export class BusinessPostsComponent implements OnInit {
  

  _opened: boolean = true;
  _rightBarOpened: boolean = false;
  _docked: boolean = true;
  _Mode:string = 'push';
  isAuthenticated = false;
  
  listSample:any = sampleList; 


  constructor() { }

  ngOnInit(): void {
  }
  

  _toggleSidebar() { 
    this._opened = !this._opened;
  }
  _toggleRightbar()
  {
    this._rightBarOpened = !this._rightBarOpened;
  }
  
}
