import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UtilsService, TokenPayload } from '../../services/utils.service';

@Injectable()
export class UserService {

  constructor(private utilService: UtilsService) { }

  public register(user: TokenPayload): Observable<any> {    
    return this.utilService.apiRequest('post', 'user/register', user);
  }

  public login(user: TokenPayload): Observable<any> {
    return this.utilService.apiRequest('post', 'user/login', user);
  }
}
