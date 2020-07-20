import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted = false;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.authService.logout();
    console.log(" First logout ...");

  }

  ngOnInit () {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get formControls () { return this.loginForm.controls; }

  login () {
    console.log("Sign in form  ......", this.loginForm.controls);

    console.log(this.loginForm.value);
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.signin(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value).subscribe(
      (res) => {
        console.log("Sign in ......", res, this.authService.authStatus);
        if (this.authService.authStatus) {
          this.router.navigate(["/home"]);
        } else {
          alert("ERROR: Invalid username or password");
        }
      },
      (err) => {
        console.log('HTTP Error  !!!!!!!!!!!!!!!! ', err);
        alert("ERROR: Invalid username or password");
      }
    );
  }


}
