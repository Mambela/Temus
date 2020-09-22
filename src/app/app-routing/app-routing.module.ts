import { BusinessProductsComponent } from './../pages/business-user/business-dashboard/business-products/business-products.component';
import { BusinessContentPageComponent } from './../pages/business-user/business-dashboard/business-content-page/business-content-page.component';

import { BusinessDashboardComponent } from './../pages/business-user/business-dashboard/business-dashboard.component';
import { BusinessRegistrationComponent } from './../pages/business-user/business-registration/business-registration.component';
import { BusinessPageComponent } from './../pages/business-user/business-page/business-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {Routes, RouterModule}from '@angular/router'

const appRoutes: Routes=[
  {path:'business',component:BusinessPageComponent},
  {path:'business-registration',component:BusinessRegistrationComponent},
  {path:'business-dashboard',component:BusinessDashboardComponent},
  {path:'business-page',component:BusinessContentPageComponent},
  {path:'business-products',component:BusinessProductsComponent}


  
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes,{onSameUrlNavigation:'reload'})],
  exports:[RouterModule]
    
})
export class AppRoutingModule { }
