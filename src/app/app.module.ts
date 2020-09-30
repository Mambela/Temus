import { CategoryService } from './core-services/http-service/category-service.service';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BusinessPageComponent } from './pages/business-user/business-page/business-page.component';
import { BusinessRegistrationComponent } from './pages/business-user/business-registration/business-registration.component';
import { MainFooterComponent } from './sections/main-footer/main-footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MapComponent } from './sections/map/map.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PopMapComponent } from './sections/pop-map/pop-map.component';
import { FormsModule } from '@angular/forms';
import { SavingLoaderComponent } from './sections/loaders/saving-loader/saving-loader.component';
import { BusinessDashboardComponent } from './pages/business-user/business-dashboard/business-dashboard.component';
import {SidebarModule} from 'ng-sidebar';
import { SidebarComponent } from './sections/business/sidebar/sidebar.component';
import { BusinessProductsComponent } from './pages/business-user/business-dashboard/business-products/business-products.component';
import { BusinessContentPageComponent } from './pages/business-user/business-dashboard/business-content-page/business-content-page.component';
import { BusinessTopnavbarComponent } from './pages/business-user/business-dashboard/business-topnavbar/business-topnavbar.component';
import { RightsidebarComponent } from './sections/business/rightsidebar/rightsidebar.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { BusinessServiceComponent } from './pages/business-user/business-dashboard/business-service/business-service.component';
import { BusinessEventsComponent } from './pages/business-user/business-dashboard/business-events/business-events.component';
import { BusinessPostsComponent } from './pages/business-user/business-dashboard/business-posts/business-posts.component';
import { BusinessMediaComponent } from './pages/business-user/business-dashboard/business-media/business-media.component';
import { UserpostComponent } from './sections/userpost/userpost.component';
import { SideLoaderComponent } from './sections/loaders/side-loader/side-loader.component';
import { DataLoadingComponent } from './sections/loaders/data-loading/data-loading.component';
import { AddNewProductServiceComponent } from './sections/business/add-new-product-service/add-new-product-service.component';
import { DialogboxComponent } from './sections/dialogbox/dialogbox.component';
import { AddNewServiceComponent } from './sections/business/add-new-service/add-new-service.component';
import { BusinessPostsPageComponent } from './pages/business-user/business-dashboard/business-posts-page/business-posts-page.component';

 

@NgModule({
  declarations: [
    AppComponent,
    BusinessPageComponent,
    BusinessRegistrationComponent,
    MainFooterComponent,
    MapComponent,
    PopMapComponent,
    SavingLoaderComponent,
    BusinessDashboardComponent,
    SidebarComponent,
    BusinessProductsComponent,
    BusinessContentPageComponent,
    BusinessTopnavbarComponent,
    RightsidebarComponent,
    BusinessServiceComponent,
    BusinessEventsComponent,
    BusinessPostsComponent,
    BusinessMediaComponent,
    UserpostComponent,
    SideLoaderComponent,
    DataLoadingComponent,
    AddNewProductServiceComponent,
    DialogboxComponent,
    AddNewServiceComponent,
    BusinessPostsPageComponent,
  
 
  ],
  imports: [
    BrowserModule,AppRoutingModule,FormsModule, NgbModule, FontAwesomeModule,SidebarModule.forRoot(),HttpClientModule,
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
      showSubtitle:false
    }), 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 


  
  
}
