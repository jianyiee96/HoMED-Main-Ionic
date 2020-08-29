import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.page.html',
  styleUrls: ['./login-screen.page.scss'],
})
export class LoginScreenPage implements OnInit {
 
  nric: string
  password: string

  constructor(private location: Location) { 
  }

  ngOnInit() {
  }

  login(loginForm: NgForm) {
  }

  clear() {
    this.nric = ""
    this.password = ""
  }

  back() {
    this.location.back()
  }

}
