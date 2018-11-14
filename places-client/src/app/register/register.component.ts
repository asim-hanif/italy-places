import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { TokenPayload } from '../services/utils.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  credentials: TokenPayload = {
    email: '',
    name: '',
    password: ''
  };
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router, private authService: AuthenticationService) {
    this.registerForm = new FormGroup({
      'name': new FormControl(this.credentials.name, [
        Validators.required,
      ]),
      'email': new FormControl(this.credentials.email, [Validators.email, Validators.required]),
      'password': new FormControl(this.credentials.password, Validators.required)
    });
  }

  ngOnInit() {
    if(this.authService.isLoggedIn())
      this.router.navigateByUrl('/home');
  }

  isFieldNotValid(formControl: AbstractControl){
    return (formControl.dirty || formControl.touched) && formControl.invalid;
  }

  register() {
    if(this.registerForm.valid) {
      this.errorMessage = '';
      this.userService.register(this.registerForm.value).subscribe(() => {
        this.router.navigateByUrl('/home');
      }, (err: any) => {
        this.errorMessage = err.error.message;
      });
    }
    else{
      for(var control in this.registerForm.controls){
        this.registerForm.get(control).markAsDirty();
      }
    }
  }
  
}
