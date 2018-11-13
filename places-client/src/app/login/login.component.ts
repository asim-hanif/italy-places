import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { TokenPayload } from '../services/utils.service';
import { NgModel } from '@angular/forms';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  credentials: TokenPayload = {
    email: '',
    password: ''
  };

  errorMessage: string = '';
  constructor(private userService: UserService, private router: Router) {}

  login(email: NgModel , password: NgModel) {
    if(email.valid && password.valid)
      this.userService.login(this.credentials).subscribe(() => {
        this.router.navigateByUrl('/home');
        }, (err:any) => {
        this.errorMessage = err.error.message;
      }); 
  }
}
