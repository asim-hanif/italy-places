import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AgGridModule } from "ag-grid-angular";
import { MapModule, MapAPILoader } from "angular-maps";

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuardService } from './services/auth-guard.service';
import { FavouritComponent } from './favourit/favourit.component';
import { MapComponent } from './map/map.component';
import { BingMapServiceProviderFactory, GoogleMapServiceProviderFactory, UtilsService } from './services/utils.service';
import { SearchMapService, BingSearchMapServiceProviderFactory,
   GoogleSearchMapServiceProviderFactory } from './services/search-map.service';
import { SearchMapComponent } from './search-map/search-map.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'map', component: MapComponent },
  { path: 'searchmap', component: SearchMapComponent },
];

const useBing: boolean = false;

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    AgGridModule.withComponents([FavouritComponent]),
    useBing ? MapModule.forRootBing() : MapModule.forRootGoogle(),
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    FavouritComponent,
    MapComponent,
    SearchMapComponent
  ],
  providers: [
    AuthenticationService,
    AuthGuardService,
    {
      provide: MapAPILoader, deps: [UtilsService], useFactory: useBing ? BingMapServiceProviderFactory : GoogleMapServiceProviderFactory
    },
    {
      provide: SearchMapService, deps: [UtilsService],
      useFactory: useBing ? BingSearchMapServiceProviderFactory : GoogleSearchMapServiceProviderFactory
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
