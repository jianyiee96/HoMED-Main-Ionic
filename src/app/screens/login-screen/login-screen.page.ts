import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Animation, AnimationController } from '@ionic/angular';

import { ServicemanService } from 'src/app/services/serviceman/serviceman.service';
import { SessionService } from 'src/app/services/session/session.service';
import { Serviceman } from 'src/app/classes/serviceman/serviceman';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.page.html',
  styleUrls: ['./login-screen.page.scss'],
})
export class LoginScreenPage implements OnInit {

  @ViewChild('errorMessage') errorMessageViewChild: ElementRef;

  errorMessageAnimation: Animation
  isPlaying = false

  nric: string
  password: string
  errorMessageString: string
  invalidLogin: boolean

  constructor(
    private router: Router,
    private servicemanService: ServicemanService,
    private sessionService: SessionService,
    private animationController: AnimationController) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.invalidLogin = false
    this.clear()
  }

  login(loginForm: NgForm) {

    if (loginForm.valid) {

      this.sessionService.setNric(this.nric)
      this.sessionService.setPassword(this.password)

      this.servicemanService.servicemanLogin(this.nric, this.password).subscribe(
        response => {
          let serviceman: Serviceman = response.serviceman

          if (serviceman != null) {

            this.sessionService.setIsLogin(true)
            this.sessionService.setCurrentServiceman(serviceman)
            this.router.navigate(['/home-screen'])

          } else {
            this.invalidLogin = true
            this.errorMessageString = "Serviceman account doesn't exist."
            this.loadErrorMessage()

          }
        },
        error => {
          this.invalidLogin = true
          this.errorMessageString = "Invalid login credentials."
          this.loadErrorMessage()
        }
      )

    }

  }

  loadErrorMessage() {
    this.errorMessageAnimation = this.animationController.create()
    this.errorMessageAnimation
      .addElement(this.errorMessageViewChild.nativeElement)
      .duration(300)
      .easing('ease-out')
      .iterations(1)
      .fromTo('transform', 'translateY(10%)', 'translateY(40%)')
      .fromTo('opacity', 0, 0.8)
      .delay(150)

    this.toggleAnimation()
  }

  toggleAnimation() {
    if (this.isPlaying) {
      this.errorMessageAnimation.pause()
    } else {
      this.errorMessageAnimation.play()
    }
  }

  clear() {
    this.nric = ""
    this.password = ""
    this.invalidLogin = false
  }

  redirectToStartScreen() {
    this.router.navigate(['/start-screen']);
  }

}
