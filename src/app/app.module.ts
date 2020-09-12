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
 
  ],
  imports: [
    BrowserModule,AppRoutingModule,FormsModule, NgbModule, FontAwesomeModule,SidebarModule.forRoot(),HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 


  constructor(private servicesCategoria: CategoryService)
  {

  }

  loadCategorias()
  {
    this.servicesCategoria.getLocalsCategoria().subscribe();
  }
  
}
