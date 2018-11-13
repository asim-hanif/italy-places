import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private host: string;
  constructor(private http: HttpClient , private authService: AuthenticationService) { 
    this.host = 'http://localhost:3000';
  }

  public request(method: 'post'|'get', type: string , data = {}): Observable<any> {
  
      return this.http.request(method ,`${this.host}/api/${type}`, {body: data, headers: { Authorization: `Bearer ${this.authService.getToken()}` }}).pipe(
        map((data: TokenResponse) => {
          if (data.token) {
            this.authService.saveToken(data.token);
          }
          return data;
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
