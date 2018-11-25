import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { IBox, IMapOptions, MarkerTypeId, IMarkerIconInfo, MapComponent as AmMapComponent } from "angular-maps";
import { SearchMapService } from '../search-map.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {

  mapOptions: IMapOptions = {
    disableBirdseye: false,
    disableStreetside: false,
    navigationBarMode: 1
  };
  
  @Input()
  latitude: any = 30.375321;
  @Input()
  longitude: any = 69.345116;

  iconInfo: IMarkerIconInfo = {
    markerType: MarkerTypeId.ScaledImageMarker,
    url: '../../assets/marker.png',
    scale: 0.02,
    markerOffsetRatio: { x: 0.5, y: 1 }
  };

  @ViewChild('map') amMap: AmMapComponent;

  constructor(searchMapService: SearchMapService) { }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(this.setLatLong.bind(this), undefined, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    });
  }

  setLatLong(position) {
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
  }
}
