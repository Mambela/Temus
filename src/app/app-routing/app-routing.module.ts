import { BusinessProfileComponent } from './../pages/business-user/business-profile/business-profile.component';
import { BusinessPostsComponent } from './../pages/business-user/business-dashboard/business-posts/business-posts.component';

import { BusinessServiceComponent } from './../pages/business-user/business-dashboard/business-service/business-service.component';
import { BusinessProductsComponent } from './../pages/business-user/business-dashboard/business-products/business-products.component';
import { BusinessContentPageComponent } from './../pages/business-user/business-dashboard/business-content-page/business-content-page.component';

import { BusinessDashboardComponent } from './../pages/business-user/business-dashboard/business-dashboard.component';
import { BusinessRegistrationComponent } from './../pages/business-user/business-registration/business-registration.component';
import { BusinessPageComponent } from './../pages/business-user/business-page/business-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {Routes, RouterModule}from '@angular/router';
import { BusinessEventsComponent } from '../pages/business-user/business-dashboard/business-events/business-events.component';
import { LandingPageComponent } from '../pages/start-page/landing-page/landing-page.component';


const appRoutes: Routes=[
  {path:'business',component:BusinessPageComponent},
  {path:'business-registration',component:BusinessRegistrationComponent},
  {path:'business-dashboard',component:BusinessDashboardComponent},
  {path:'business-page',component:BusinessContentPageComponent},
  {path:'business-products',component:BusinessProductsComponent},
  {path:'business-services',component:BusinessServiceComponent},
  {path:'business-events',component:BusinessEventsComponent},
  {path:'business-posts',component:BusinessPostsComponent},
  {path:'business-advertisement',component:BusinessPostsComponent},
  {path:'business-profile',component:BusinessProfileComponent},
  {path:'', component:LandingPageComponent}


  
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes,{onSameUrlNavigation:'reload'})],
  exports:[RouterModule]
    
})
export class AppRoutingModule { }
