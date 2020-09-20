import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BnNgIdleService } from 'bn-ng-idle';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  validAccess: boolean // determines if user can use the app

  constructor(
    private bnIdle: BnNgIdleService,
    private alertController: AlertController,
    private sessionService: SessionService,
    private router: Router) { }

  startTimer() {
    this.validAccess = true
    this.bnIdle = new BnNgIdleService()
    console.log("Starting timer for mobile application.")

    this.bnIdle.startWatching(5).subscribe((isTimedOut: boolean) => {

      if (isTimedOut) {
        this.bnIdle.stopTimer()
        this.presentWarning()
        this.bnIdle = new BnNgIdleService()

        this.bnIdle.startWatching(60).subscribe((isTimedOut: boolean) => {
          if (isTimedOut) {
            this.bnIdle.stopTimer()
            this.validAccess = false
          }
        })
      }

    })
  }

  stopTimer() {
    try {
      console.log("Stopping timer for mobile application.")
      this.bnIdle.stopTimer()
    } catch (error) {
      console.log("Unable to stop timer as its undefined.")
    }
  }

  async presentWarning() {
    const alert = await this.alertController.create({
      header: 'HoMED Warning Alert',
      backdropDismiss: false,
      message: 'Sorry! Your session has timed out. Do you wish to continue?',
      cssClass: 'activateAccountAlert',
      buttons: [
        {
          text: 'No',
          cssClass: 'cancel-button',
          handler: () => {
            this.sessionService.setIsLogin(false)
            this.sessionService.setCurrentServiceman(null)
            this.router.navigate(["/login-screen"])
          }
        },
        {
          text: 'Yes',
          cssClass: 'activate-button',
          handler: () => {
            if (this.validAccess) {
              this.stopTimer()
              this.startTimer()
            } else {
              this.presentAlert()
            }
          }
        }
      ]
    })
    await alert.present()
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'HoMED Security Alert',
      message: 'For your security, the session has timed out. Please re-login.',
      cssClass: 'activateAccountAlert',
      backdropDismiss: false,
      buttons: [
        {
          text: "Ok",
          cssClass: 'activate-button',
          handler: () => {
            this.sessionService.setIsLogin(false)
            this.sessionService.setCurrentServiceman(null)
            this.router.navigate(["/login-screen"])
          }
        }
      ]
    });
    await alert.present();
  }

}
