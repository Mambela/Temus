import { AppRoutingModule } from './app-routing/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BusinessPageComponent } from './pages/business-user/business-page/business-page.component';
import { BusinessRegistrationComponent } from './pages/business-user/business-registration/business-registration.component';
import { MainFooterComponent } from './sections/main-footer/main-footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MapComponent } from './sections/map/map.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PopMapComponent } from './sections/pop-map/pop-map.component';
 
 

@NgModule({
  declarations: [
    AppComponent,
    BusinessPageComponent,
    BusinessRegistrationComponent,
    MainFooterComponent,
    MapComponent,
    PopMapComponent,
 
  ],
  imports: [
    BrowserModule,AppRoutingModule, NgbModule, FontAwesomeModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
