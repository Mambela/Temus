import { ProductsService } from '../../../core-services/http-service/business/products.service';
import { BasicModel } from '../../../data/models/supporting/basic-model.model';


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

  isLoadingCategoria:boolean;
  productCategoria:BasicModel[];

  constructor(private productService:ProductsService) { }

  ngOnInit(): void {
  }
  
  _toggleSidebar() {
    this._opened = !this._opened;
  }
  
  getProductCategoria()
  {
      this.isLoadingCategoria = true;
      this.productService.getProductCategoria().subscribe((respCategoria:BasicModel[])=>{
            
        this.productCategoria = respCategoria['data'];
        this.isLoadingCategoria = false;
      });

      // this.productService.getProductCategoria();

  }


}
