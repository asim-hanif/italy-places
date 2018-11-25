import { Injectable } from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import { Observable } from 'rxjs';
import { Place } from '../../models/place';

@Injectable()
export class PlaceService {

  constructor(private utilService: UtilsService) { }

  public getAllPlaces(): Observable<any> {    
    return this.utilService.apiRequest('get', 'place/getAllPlaces');
  }

  public addPlace(place: Place): Observable<any> {    
    return this.utilService.apiRequest('post', 'place/addNewPlace', place);
  }

  public setIsFavourite(data): Observable<any> {    
    return this.utilService.apiRequest('post', 'place/setIsFavourite', data);
  }

  public searchPlaces(data): Observable<any> {    
    return this.utilService.apiRequest('post', 'place/searchPlaces', data);
  }
}
