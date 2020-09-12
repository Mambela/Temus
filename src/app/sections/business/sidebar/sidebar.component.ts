import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  
  @Input() toogleSideBar:boolean;
  
  _opened: boolean = true;
  _docked: boolean = true;
  _Mode:string = 'push';

  constructor() { }

  ngOnInit(): void {
  }
  
  _toggleSidebar() {
    this._opened = !this._opened;
  }
}
