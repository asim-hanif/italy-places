import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(public auth: AuthenticationService) {
    
  }

  get useBing() {
    return JSON.parse(localStorage.getItem(`useBing`));
  }

  changeMapSetting(){    
    localStorage.setItem(`useBing`, `${!this.useBing}`);
    location.reload();
  }
}
