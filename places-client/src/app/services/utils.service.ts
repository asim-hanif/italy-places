import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { BingMapAPILoaderConfig, BingMapAPILoader, WindowRef, DocumentRef, GoogleMapAPILoaderConfig, GoogleMapAPILoader } from 'angular-maps';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private host: string;
  constructor(private http: HttpClient, private authService: AuthenticationService) {
    this.host = 'http://localhost:3000';
  }

  public request(method: 'post' | 'get', type: string, data = {}): Observable<any> {

    return this.http.request(method, `${this.host}/api/${type}`,
      { body: data, headers: { Authorization: `Bearer ${this.authService.getToken()}` } }).pipe(
        map((tokenResponse: TokenResponse) => {
          if (tokenResponse.token) {
            this.authService.saveToken(tokenResponse.token);
          }
          return tokenResponse;
        })
      );
  }
}



export interface TokenPayload {
  email: string;
  password: string;
  name?: string;
}

export interface TokenResponse {
  token: string;
}

export function GoogleMapServiceProviderFactory() {
  const gc: GoogleMapAPILoaderConfig = new GoogleMapAPILoaderConfig();
  gc.apiKey = 'AIzaSyDe2QqXrbtaORvL-I0WHpiI72HxtfTz5Zo';
  return new GoogleMapAPILoader(gc, new WindowRef(), new DocumentRef());
}

export function BingMapServiceProviderFactory() {
  const bc: BingMapAPILoaderConfig = new BingMapAPILoaderConfig();
  bc.apiKey = 'Ah6XdONUHP74SCTcqdIXOyGqu_5eSOgIVy3sSi8Pt56w6GfpHggrB_MlErbioB0N';
  return new BingMapAPILoader(bc, new WindowRef(), new DocumentRef());
}
