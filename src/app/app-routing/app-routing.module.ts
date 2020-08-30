import { BusinessRegistrationComponent } from './../pages/business-user/business-registration/business-registration.component';
import { BusinessPageComponent } from './../pages/business-user/business-page/business-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {Routes, RouterModule}from '@angular/router'

const appRoutes: Routes=[
  {path:'business',component:BusinessPageComponent},
  {path:'business-registration',component:BusinessRegistrationComponent}

  
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes,{onSameUrlNavigation:'reload'})],
  exports:[RouterModule]
    
})
export class AppRoutingModule { }
