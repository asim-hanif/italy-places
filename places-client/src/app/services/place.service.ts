import { Injectable } from '@angular/core';
import { UtilsService } from './utils.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private utilService: UtilsService) { }

  public getAllPlaces(): Observable<any> {    
    return this.utilService.request('get', 'getAllPlaces');
  }
}
