import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AlertController, Animation, AnimationController, ToastController } from '@ionic/angular';

import { ServicemanService } from 'src/app/services/serviceman/serviceman.service';
import { SessionService } from 'src/app/services/session/session.service';
import { Serviceman } from 'src/app/classes/serviceman/serviceman';
import { TimerService } from 'src/app/services/timer/timer.service'

import { FCM } from 'plugins/cordova-plugin-fcm-with-dependecy-updated/ionic/ngx/FCM';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.page.html',
  styleUrls: ['./login-screen.page.scss'],
})
export class LoginScreenPage implements OnInit {

  @ViewChild('errorMessage') errorMessageViewChild: ElementRef
  @ViewChild('successMessage') successMessageViewChild: ElementRef

  messageAnimation: Animation
  isPlaying = false

  serviceman: Serviceman
  email: string
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
    public alertController: AlertController,
    private toastController: ToastController,
    private fcm: FCM
  ) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.clear()
    this.email = ""
    this.password = ""
  }

  login(loginForm: NgForm) {

    if (loginForm.valid) {

      this.sessionService.setEmail(this.email)
      this.sessionService.setPassword(this.password)

      this.invalidMessage = false
      this.validMessage = false

      this.servicemanService.login(this.email, this.password).subscribe(
        response => {

          this.serviceman = response.serviceman

          if (this.serviceman != null) {

            if (this.serviceman.isActivated) {
              this.sessionService.setIsLogin(true)
              this.sessionService.setCurrentServiceman(this.serviceman)
              this.timerService.startPrimaryTimer()
              this.sessionService.setToken(this.serviceman.token)

              try {
                this.fcmRegistration()
              } catch (error) {
                console.error(`Failed to retrieve FCM Token, Ionic App will not be receiving push notifications and in-app banner notifications.`);
              }

              this.router.navigate(['/home-screen'])
            } else {
              this.activateAccountPrompt()
            }

          } else {
            this.presentFailedMessage("Serviceman account doesn't exist.")
          }
        },
        error => {
          this.presentFailedMessage(error.substring(37))
        }
      )

    }

  }

  fcmRegistration() {
    this.fcm.getToken().then(token => {
      console.log(token);
      this.servicemanService.assignFcmToken(token).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      )
    });

    this.fcm.onNotification().subscribe(data => {
      if (data.wasTapped) {
        console.log('Received in background');
      } else {
        this.presentNewInAppNotification(data["title"])
        console.log('Received in foreground');
      }
    });

    this.fcm.onTokenRefresh().subscribe(token => {
      console.log(`TOKEN REFRESHED, NEW TOKEN: `);
      console.log(token);
    });
  }

  async presentNewInAppNotification(messageToDisplay: string) {
    const toast = await this.toastController.create({
      message: messageToDisplay,
      cssClass: "inAppToastStyle",
      duration: 3500,
      position: "top",
      mode: "ios",
      buttons: [
        {
          side: 'end',
          role: 'cancel',
          text: 'View',
          handler: () => {
            this.router.navigate(['/notification-screen'])
          }
        }
      ]
    })
    toast.present()
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
          handler: () => {
            this.serviceman = null
          }
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
              this.activateAccount(this.email, data.newPassword, data.confirmNewPassword)
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
          name: 'email',
          type: 'email',
          placeholder: 'Email'
        },
        {
          name: 'phoneNumber',
          type: 'number',
          placeholder: 'Phone Number'
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
          text: 'Reset Password',
          cssClass: 'activate-button',
          handler: data => {
            if (data.phoneNumber.length != 8) {
              this.updateAlertMessage("Please enter a valid phone number.", alert);
              return false;
            } else if (data.email.length < 10 || data.email.length > 64) {
              this.updateAlertMessage("Please enter a valid email.", alert);
              return false;
            } else {
              this.resetPassword(data.email, data.phoneNumber)
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

  activateAccount(email: string, newPassword: string, confirmNewPassword: string) {
    this.servicemanService.activateAccount(email, newPassword, confirmNewPassword).subscribe(
      response => {
        this.presentSuccessMessage("Account activated.")

        this.sessionService.setIsLogin(true)
        this.sessionService.setCurrentServiceman(this.serviceman)
        this.sessionService.setToken(this.serviceman.token)
        this.timerService.startPrimaryTimer()
        this.router.navigate(['/home-screen'])
      }, error => {
        this.presentFailedMessage(error.substring(37)) // password validity not implemented in backend
      }
    );
  }

  resetPassword(email: string, phoneNumber: string) {
    this.servicemanService.resetPassword(email, phoneNumber).subscribe(
      response => {
        this.presentSuccessMessage("Password successfully reset. Do check your account email for the new OTP.")
      }, error => {
        this.presentFailedMessage(error.substring(37))
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
    this.email = ""
    this.password = ""
    this.invalidMessage = false
    this.validMessage = false
  }

  redirectToStartScreen() {
    this.router.navigate(['/start-screen']);
  }

}
