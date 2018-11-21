import { Injectable } from '@angular/core';
import { UtilsService } from './utils.service';
import { Place } from '../models/place';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
declare const google: any;

export abstract class SearchMapService {

  public abstract ApiKey: string;
  public abstract searchText: string;
  public abstract region: string;

  constructor() { }

  public abstract search();

  public abstract getPlaceDetail(place: MapPlace): Observable<Place>;

}

@Injectable()
export class GoogleSearchMapService extends SearchMapService {

  ApiKey: string;
  searchText: string;
  region: string;

  constructor(private utilsService: UtilsService) {
    super();
    this.ApiKey = '';
    this.searchText = '';
    this.region = 'it';
  }

  public search() {
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?
                  query=${this.searchText}&
                  region=${this.region}&
                  key=${this.ApiKey}`;

  }

  getPlaceDetail(place: MapPlace): Observable<Place> {
    return new Observable((observer) => observer.next(new Place()));
  }

}

@Injectable()
export class BingSearchMapService extends SearchMapService {

  ApiKey: string;
  searchText: string;
  region: string;

  constructor(private utilsService: UtilsService) {
    super();
    this.ApiKey = '';
  }


  public search() {
    const url = `http://dev.virtualearth.net/REST/v1/Autosuggest?
    query=${this.searchText}&
    region=lt&
    maxResults=10&
    userRegion=${this.region}&
    countryFilter=${this.region}&
    key=${this.ApiKey}`;

    this.utilsService.request('get', url).pipe(
      map(data => {
        return data.resourceSets[0].resources[0].value.map(item => {
          const place = new Place();
          place.address = item.address.formattedAddress;
          place.name = item.name;
          place.type = item.address.entityType || item.__type;

          const searchMapPlace = new MapPlace();
          searchMapPlace.place = place;
          return searchMapPlace;
        });
      }));
  }

  getPlaceDetail(place: MapPlace): Observable<Place> {
    return new Observable();
  }
}


export function BingSearchMapServiceProviderFactory(utilsService: UtilsService) {
  return new BingSearchMapService(utilsService);
}
export function GoogleSearchMapServiceProviderFactory(utilsService: UtilsService) {
  return new GoogleSearchMapService(utilsService);
}

export class MapPlace {
  public place: Place;
  public latitude: number;
  public logitude: number;
  public placeDetailId: any;
}
