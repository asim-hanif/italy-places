import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { HomeComponent } from './modules/place/home/home.component';
import { MapComponent } from './modules/map/map/map.component';
import { SearchMapComponent } from './modules/map/search-map/search-map.component';
import { AddPlaceComponent } from './modules/place/add-place/add-place.component';
import { AppComponent } from './app.component';
import { AuthenticationService } from './services/authentication.service';
import { PlaceModule } from './modules/place/place.module';
import { UserModule } from './modules/user/user.module';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'map', component: MapComponent },
  { path: 'searchmap', component: SearchMapComponent },
  { path: 'addplace', component: AddPlaceComponent },
  { path: 'user', loadChildren: './modules/user/user.module#UserModule' },
];


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    PlaceModule,
    UserModule,
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    AuthenticationService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
