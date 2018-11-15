import { Injectable } from '@angular/core';
import { UtilsService } from './utils.service';
import { Observable } from 'rxjs';
import { Place } from '../models/place';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private utilService: UtilsService) { }

  public getAllPlaces(): Observable<any> {    
    return this.utilService.request('get', 'getAllPlaces');
  }

  public addPlace(place: Place): Observable<any> {    
    return this.utilService.request('post', 'addNewPlace', place);
  }

  public setIsFavourite(data): Observable<any> {    
    return this.utilService.request('post', 'setIsFavourite', data);
  }

  public searchPlaces(data): Observable<any> {    
    return this.utilService.request('post', 'searchPlaces', data);
  }
}
