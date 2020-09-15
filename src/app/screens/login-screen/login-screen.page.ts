import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AlertController, Animation, AnimationController } from '@ionic/angular';

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
  @ViewChild('successMessage') successMessageViewChild: ElementRef;

  messageAnimation: Animation
  isPlaying = false

  nric: string
  password: string
  messageString: string
  invalidMessage: boolean
  validMessage: boolean

  constructor(
    private router: Router,
    private servicemanService: ServicemanService,
    private sessionService: SessionService,
    private animationController: AnimationController,
    public alertController: AlertController,) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.clear()
  }

  login(loginForm: NgForm) {

    if (loginForm.valid) {

      this.sessionService.setNric(this.nric)
      this.sessionService.setPassword(this.password)

      this.invalidMessage = false
      this.validMessage = false

      this.servicemanService.login(this.nric, this.password).subscribe(
        response => {
          let serviceman: Serviceman = response.serviceman

          if (serviceman != null) {

            if (serviceman.isActivated) {
              this.sessionService.setIsLogin(true)
              this.sessionService.setCurrentServiceman(serviceman)
              this.router.navigate(['/home-screen'])
            } else {
              this.activateAccountPrompt()
            }
          } else {
            this.invalidMessage = true
            this.validMessage = !this.invalidMessage
            this.messageString = "Serviceman account doesn't exist."
            this.loadErrorMessage()
          }
        },
        error => {
          this.invalidMessage = true
          this.validMessage = !this.invalidMessage
          this.messageString = "Invalid login credentials."
          this.loadErrorMessage()
        }
      )

    }

  }

  async activateAccountPrompt() {
    const alert = await this.alertController.create({
      header: 'Activate Account',
      subHeader: 'First time users are required to change their password from OTP in order to activate their account.',
      cssClass: 'activateAccountAlert',
      inputs: [
        {
          name: 'otp',
          type: 'password',
          placeholder: 'Given OTP'
        },
        {
          name: 'newPassword',
          type: 'password',
          placeholder: 'New Password'
        },
        {
          name: 'confirmNewPassword',
          type: 'password',
          placeholder: 'Confirm New Password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'cancel-button',
          handler: () => { }
        },
        {
          text: 'Activate',
          cssClass: 'activate-button',
          handler: data => {
            if (data.newPassword != data.confirmNewPassword) {
              this.updateAlertMessage("The two given passwords do not match.", alert);
              return false;
            } else if (data.newPassword.length < 8) {
              this.updateAlertMessage("New password must be at least 8 characters.", alert);
              return false;
            } else if (data.otp == data.newPassword) {
              this.updateAlertMessage("New password cannot be same as OTP.", alert);
              return false;
            } else {
              this.activateAccount(this.nric, data.otp, data.newPassword)
            }
          }
        }
      ],
      backdropDismiss: false
    });

    await alert.present();
  }

  updateAlertMessage(message: string, alert: HTMLIonAlertElement) {
    alert.message = message
  }

  activateAccount(nric: string, oldPassword: string, newPassword: string) {
    this.servicemanService.changePassword(nric, oldPassword, newPassword).subscribe(
      response => {
        this.validMessage = true
        this.invalidMessage = !this.validMessage
        this.messageString = "Account activated"
        this.loadSuccessMessage()
        this.password = ""
      }, error => {
        this.invalidMessage = true
        this.validMessage = !this.invalidMessage
        this.messageString = "Wrong OTP entered"
        this.loadErrorMessage()
      }
    );
  }

  loadSuccessMessage() {
    this.messageAnimation = this.animationController.create()
    this.messageAnimation
      .addElement(this.successMessageViewChild.nativeElement)
      .duration(300)
      .easing('ease-out')
      .iterations(1)
      .fromTo('transform', 'translateY(10%)', 'translateY(40%)')
      .fromTo('opacity', 0, 0.9)
      .delay(150)

    this.toggleAnimation()
  }

  loadErrorMessage() {
    this.messageAnimation = this.animationController.create()
    this.messageAnimation
      .addElement(this.errorMessageViewChild.nativeElement)
      .duration(300)
      .easing('ease-out')
      .iterations(1)
      .fromTo('transform', 'translateY(10%)', 'translateY(40%)')
      .fromTo('opacity', 0, 0.9)
      .delay(150)

    this.toggleAnimation()
  }

  toggleAnimation() {
    if (this.isPlaying) {
      this.messageAnimation.pause()
    } else {
      this.messageAnimation.play()
    }
  }

  clear() {
    this.nric = ""
    this.password = ""
    this.invalidMessage = false
    this.validMessage = false
  }

  redirectToStartScreen() {
    this.router.navigate(['/start-screen']);
  }

}
