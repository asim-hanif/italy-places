import { Component, OnInit } from '@angular/core';
import { IBox, IMapOptions, MarkerTypeId, MapAPILoader } from "angular-maps";


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
  box: IBox = {
    maxLatitude: 32,
    maxLongitude: -92,
    minLatitude: 29,
    minLongitude: -98
  };
  latitude: any = 30.375321;
  logitude: any = 69.345116;

  constructor() { }

  ngOnInit() {

    navigator.geolocation.getCurrentPosition(this.setLatLong.bind(this), undefined , {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    });
  }

  setLatLong(position) {
    this.latitude = position.coords.latitude;
    this.logitude = position.coords.longitude;
  }
}
