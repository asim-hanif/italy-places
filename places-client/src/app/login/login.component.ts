import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { TokenPayload } from '../services/utils.service';
import { NgModel } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  credentials: TokenPayload = {
    email: '',
    password: ''
  };

  errorMessage: string = '';
  constructor(private userService: UserService, private router: Router, private authService: AuthenticationService) {}

  ngOnInit() {
    if(this.authService.isLoggedIn())
      this.router.navigateByUrl('/home');
  }
  login(email: NgModel , password: NgModel) {
    if(email.valid && password.valid)
      this.userService.login(this.credentials).subscribe(() => {
        this.router.navigateByUrl('/home');
        }, (err:any) => {
        this.errorMessage = err.error.message;
      });
  }
}
