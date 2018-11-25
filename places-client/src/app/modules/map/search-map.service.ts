import { Injectable } from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import { Place } from '../../models/place';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
declare const google: any;

export abstract class SearchMapService {

  public abstract ApiKey: string;
  public abstract region: string;

  constructor() { }

  public abstract search(searchText: string): Observable<SearchMapPlace[]>;

  public abstract getPlaceDetail(placeDetailId: string): Observable<SearchMapPlaceDetails>;

}

@Injectable()
export class GoogleSearchMapService extends SearchMapService {

  ApiKey: string;
  region: string;

  constructor(private utilsService: UtilsService) {
    super();
    this.ApiKey = 'AIzaSyDe2QqXrbtaORvL-I0WHpiI72HxtfTz5Zo';
    this.region = 'it';
  }

  public search(searchText: string): Observable<SearchMapPlace[]> {
    let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?`
    url += `query=${searchText}&`
    url += `region=${this.region}&`
    url += `key=${this.ApiKey}`;

    return this.utilsService.apiRequest(`post`, `request/jsonRequest`, { url: url }).pipe(
      map(data => {
        const places: SearchMapPlace[] = data.results.map(item => {
          const place = new SearchMapPlace();
          place.name = item.name;
          place.placeDetailId = item.place_id;
          return place;
        });
        if(places.length > 10)
        {
          places.splice(9)
        }
        return places;
      }));

  }

  getPlaceDetail(placeDetailId): Observable<SearchMapPlaceDetails> {
    let url = `https://maps.googleapis.com/maps/api/place/details/json?`
    url += `placeid=${placeDetailId}&`
    url += `fields=name,formatted_address,formatted_phone_number,type,geometry&`;
    url += `key=${this.ApiKey}`;

    return this.utilsService.apiRequest(`post`, `request/jsonRequest`, { url: url }).pipe(
      map(data => {
        const place = data.result;
        const placeDetails = new SearchMapPlaceDetails();
        placeDetails.place = new Place();

        placeDetails.place.name = place.name ? place.name : `` ;
        placeDetails.place.address = place.formatted_address ? place.formatted_address : ``;
        placeDetails.place.telephoneNo = place.formatted_phone_number ? place.formatted_phone_number : ``;
        placeDetails.place.type = place.types.length > 0 ? place.types[0] : ``;

        placeDetails.latitude = place.geometry.location.lat;
        placeDetails.logitude = place.geometry.location.lng;

        return placeDetails;
      }));
  }

}

@Injectable()
export class BingSearchMapService extends SearchMapService {

  ApiKey: string;
  region: string;

  constructor(private utilsService: UtilsService) {
    super();
    this.ApiKey = 'Ah6XdONUHP74SCTcqdIXOyGqu_5eSOgIVy3sSi8Pt56w6GfpHggrB_MlErbioB0N';
    this.region = 'it';
  }


  public search(searchText: string): Observable<SearchMapPlace[]> {
    let url = `http://dev.virtualearth.net/REST/v1/Autosuggest?`;
    url += `query=${searchText}&`
    url += `maxResults=10&`
    url += `userRegion=${this.region}&`
    url += `countryFilter=${this.region}&`
    url += `key=${this.ApiKey}`;

    return this.utilsService.apiRequest(`post`, `request/jsonRequest`, { url: url }).pipe(
      map(data => {
        return data.resourceSets[0].resources[0].value.map(item => {
          const place = new SearchMapPlace();
          place.name = item.address.formattedAddress;
          place.placeDetailId = item.address.formattedAddress;
          return place;
        });
      }));
  }

  getPlaceDetail(placeDetailId): Observable<SearchMapPlaceDetails> {
    let url = `http://dev.virtualearth.net/REST/v1/locations?`;
    url += `query=${placeDetailId}&`
    url += `maxResults=10&`
    url += `key=${this.ApiKey}`;

    return this.utilsService.apiRequest(`post`, `request/jsonRequest`, { url: url }).pipe(
      map(data => {
        const places = data.resourceSets[0].resources;
        const place = places.length > 0 ? places[0] : {}
        const placeDetails = new SearchMapPlaceDetails();
        placeDetails.place = new Place();

        placeDetails.place.name = place.name ? place.name : ``;
        placeDetails.place.address = place.address.formattedAddress ? place.address.formattedAddress : ``;
        placeDetails.place.telephoneNo = place.formatted_phone_number ? place.formatted_phone_number : ``;
        placeDetails.place.type = place.entityType ? place.entityType : ``;

        placeDetails.latitude = place.point.coordinates[0];
        placeDetails.logitude = place.point.coordinates[1];

        return placeDetails;
      }));
  }
}


export function BingSearchMapServiceProviderFactory(utilsService: UtilsService) {
  return new BingSearchMapService(utilsService);
}
export function GoogleSearchMapServiceProviderFactory(utilsService: UtilsService) {
  return new GoogleSearchMapService(utilsService);
}

export class SearchMapPlace {
  public name: string;
  public placeDetailId: any;
}

export class SearchMapPlaceDetails {
  public place: Place;
  public latitude: number;
  public logitude: number;
}