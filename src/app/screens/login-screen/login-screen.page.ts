import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AlertController, Animation, AnimationController } from '@ionic/angular';

import { ServicemanService } from 'src/app/services/serviceman/serviceman.service';
import { SessionService } from 'src/app/services/session/session.service';
import { Serviceman } from 'src/app/classes/serviceman/serviceman';
import { TimerService } from 'src/app/services/timer/timer.service'

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

  serviceman: Serviceman
  nric: string
  password: string
  messageString: string
  invalidMessage: boolean
  validMessage: boolean

  constructor(
    private router: Router,
    private servicemanService: ServicemanService,
    private sessionService: SessionService,
    private timerService: TimerService,
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

          this.serviceman = response.serviceman

          if (this.serviceman != null) {

            if (this.serviceman.isActivated) {
              this.sessionService.setIsLogin(true)
              this.sessionService.setCurrentServiceman(this.serviceman)
              this.timerService.startPrimaryTimer()
              this.router.navigate(['/home-screen'])
            } else {
              this.activateAccountPrompt()
            }
          } else {
            this.presentFailedMessage("Serviceman account doesn't exist.")
          }
        },
        error => {
          this.presentFailedMessage("Invalid login credentials.")
        }
      )

    }

  }

  async activateAccountPrompt() {
    const alert = await this.alertController.create({
      header: 'Activate Account',
      subHeader: 'Users are required to change their password from OTP in order to activate their account.',
      cssClass: 'activateAccountAlert',
      inputs: [
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
            } else if (this.password == data.newPassword) {
              this.updateAlertMessage("New password cannot be same as OTP.", alert);
              return false;
            } else {
              this.activateAccount(this.nric, data.newPassword, data.confirmNewPassword)
            }
          }
        }
      ],
      backdropDismiss: false
    });

    await alert.present();
  }

  async forgetPasswordPrompt() {
    const alert = await this.alertController.create({
      header: 'Forget Password',
      subHeader: 'Upon successful reset, your account will be inactivated and you will receive an OTP to reactivate your account.',
      cssClass: 'activateAccountAlert',
      inputs: [
        {
          name: 'nric',
          placeholder: 'NRIC/FIN'
        },
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email'
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
          text: 'Send OTP',
          cssClass: 'activate-button',
          handler: data => {
            if (data.nric.length != 9) {
              this.updateAlertMessage("Please enter a valid NRIC.", alert);
              return false;
            } else if (data.email.length < 10 || data.email.length > 64) {
              this.updateAlertMessage("Please enter a valid email.", alert);
              return false;
            } else {
              this.resetPassword(data.nric, data.email)
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

  activateAccount(nric: string, newPassword: string, confirmNewPassword: string) {
    this.servicemanService.activateAccount(nric, newPassword, confirmNewPassword).subscribe(
      response => {
        this.presentSuccessMessage("Account activated.")

        this.sessionService.setIsLogin(true)
        this.sessionService.setCurrentServiceman(this.serviceman)
        this.timerService.startPrimaryTimer()
        this.router.navigate(['/home-screen'])
      }, error => {
        this.presentFailedMessage("Invalid password combination.") // password validity not implemented in backend
      }
    );
  }

  resetPassword(nric: string, email: string) {
    this.servicemanService.resetPassword(nric, email).subscribe(
      response => {
        this.presentSuccessMessage("Password successfully reset. Do check your account email for the new OTP.")
      }, error => {
        this.presentFailedMessage("NRIC does not match account email entered. Please try again.")
      }
    )
  }

  presentSuccessMessage(message: string) {
    this.validMessage = true
    this.invalidMessage = !this.validMessage
    this.messageString = message
    this.loadSuccessMessage()
    this.password = ""
  }

  presentFailedMessage(message: string) {
    this.invalidMessage = true
    this.validMessage = !this.invalidMessage
    this.messageString = message
    this.loadErrorMessage()
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
