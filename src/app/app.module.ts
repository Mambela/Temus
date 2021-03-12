import { LandingPageComponent } from './pages/start-page/landing-page/landing-page.component';
import { ToasterComponent } from './sections/toast/toaster/toaster.component';

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
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SavingLoaderComponent } from './sections/loaders/saving-loader/saving-loader.component';
import { BusinessDashboardComponent } from './pages/business-user/business-dashboard/business-dashboard.component';
import {SidebarModule} from 'ng-sidebar';
import { SidebarComponent } from './components/business-user/sidebar/sidebar.component';
import { BusinessProductsComponent } from './pages/business-user/business-dashboard/business-products/business-products.component';
import { BusinessContentPageComponent } from './pages/business-user/business-dashboard/business-content-page/business-content-page.component';
import { BusinessTopnavbarComponent } from './pages/business-user/business-dashboard/business-topnavbar/business-topnavbar.component';
import { RightsidebarComponent } from './components/business-user/rightsidebar/rightsidebar.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { BusinessServiceComponent } from './pages/business-user/business-dashboard/business-service/business-service.component';
import { BusinessEventsComponent } from './pages/business-user/business-dashboard/business-events/business-events.component';
import { BusinessPostsComponent } from './pages/business-user/business-dashboard/business-posts/business-posts.component';
import { BusinessMediaComponent } from './pages/business-user/business-dashboard/business-media/business-media.component';
import { UserpostComponent } from './sections/userpost/userpost.component';
import { SideLoaderComponent } from './sections/loaders/side-loader/side-loader.component';
import { DataLoadingComponent } from './sections/loaders/data-loading/data-loading.component';
import { AddNewProductServiceComponent } from './components/business-user/add-new-product-service/add-new-product-service.component';
import { DialogboxComponent } from './sections/dialogbox/dialogbox.component';
import { AddNewServiceComponent } from './components/business-user/add-new-service/add-new-service.component';

import { SinglePostComponent } from './sections/single-post/single-post.component';
import { BusinessProfileComponent } from './pages/business-user/business-profile/business-profile.component';
import { ToasterContainerComponent } from './sections/toast/toaster-container/toaster-container.component';
import { MainPageComponent } from './pages/regular-user/main-page/main-page.component';
import { SearchComponent } from './pages/regular-user/search/search.component';
import { TemplatesComponent } from './components/templates/templates.component';
import { UnathenticatedNavBarComponent } from './components/regular-user/unathenticated-nav-bar/unathenticated-nav-bar.component';

import { SearchServiceComponent } from './pages/regular-user/search/search-service/search-service.component';
import { SearchProdutoComponent } from './pages/regular-user/search/search-produto/search-produto.component';
import { SearchEventoComponent } from './pages/regular-user/search/search-evento/search-evento.component';
import { SearchLocalComponent } from './pages/regular-user/search/search-local/search-local.component';
import { ExploreMapViewComponent } from './pages/regular-user/explore-map-view/explore-map-view.component';
 
import { MessageBoxComponent } from './sections/message-box/message-box.component';
import { LocalfiltersComponent } from './components/regular-user/localfilters/localfilters.component';
import { ServicofiltersComponent } from './components/regular-user/servicofilters/servicofilters.component';
import { ProdutofiltersComponent } from './components/regular-user/produtofilters/produtofilters.component';
 import { SearchBarComponent } from './components/landing-page/search-bar/search-bar.component';
import { GeneralFooterComponent } from './components/general-components/general-footer/general-footer.component';

 

 

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
    LandingPageComponent,
    SinglePostComponent,
    
    BusinessProfileComponent,
    
    ToasterContainerComponent,
    ToasterComponent,
    MainPageComponent,
    SearchComponent,
    TemplatesComponent,
    UnathenticatedNavBarComponent,
    
    
    SearchServiceComponent,
    
    
    SearchProdutoComponent,
    
    
    SearchEventoComponent,
    
    
    SearchLocalComponent,
    ExploreMapViewComponent,
    MessageBoxComponent,
    LocalfiltersComponent,
    ServicofiltersComponent,
    ProdutofiltersComponent,
    SearchBarComponent,
    GeneralFooterComponent
 
  
 
  ],
  imports: [
    BrowserModule,AppRoutingModule,FormsModule,ReactiveFormsModule, NgbModule, FontAwesomeModule,SidebarModule.forRoot(),HttpClientModule,
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
