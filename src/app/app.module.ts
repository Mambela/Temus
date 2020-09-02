import { AppRoutingModule } from './app-routing/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BusinessPageComponent } from './pages/business-user/business-page/business-page.component';
import { BusinessRegistrationComponent } from './pages/business-user/business-registration/business-registration.component';
import { MainFooterComponent } from './sections/main-footer/main-footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
 
 

@NgModule({
  declarations: [
    AppComponent,
    BusinessPageComponent,
    BusinessRegistrationComponent,
    MainFooterComponent,
 
  ],
  imports: [
    BrowserModule,AppRoutingModule, NgbModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
