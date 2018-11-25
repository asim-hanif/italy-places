import { MapModule as AngularMapsModule} from 'angular-maps';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { SearchMapComponent } from './search-map/search-map.component';
import { MapAPILoader } from 'angular-maps';
import { UtilsService, BingMapServiceProviderFactory, GoogleMapServiceProviderFactory } from 'src/app/services/utils.service';
import { SearchMapService, BingSearchMapServiceProviderFactory, GoogleSearchMapServiceProviderFactory } from './search-map.service';

var useBing: boolean = JSON.parse(localStorage.getItem(`useBing`));

@NgModule({
  imports: [
    CommonModule,
    useBing ? AngularMapsModule.forRootBing() : AngularMapsModule.forRootGoogle(),
  ],
  declarations: [MapComponent, SearchMapComponent],
  exports: [MapComponent, SearchMapComponent],
  providers: [
    {
      provide: MapAPILoader, deps: [UtilsService], useFactory: useBing ? BingMapServiceProviderFactory : GoogleMapServiceProviderFactory
    },
    {
      provide: SearchMapService, deps: [UtilsService],
      useFactory: useBing ? BingSearchMapServiceProviderFactory : GoogleSearchMapServiceProviderFactory
    },
  ],
})
export class MapModule { }
