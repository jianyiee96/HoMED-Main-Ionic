import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { BnNgIdleService } from 'bn-ng-idle';
import { ServicemanService } from '../serviceman/serviceman.service';
import { SessionService } from '../session/session.service';

const PRIMARY_TIMER_SEC = 60 * 4
const SECONARY_TIMER_SEC = 60

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  validAccess: boolean // determines if user can continue using the app

  primaryTimer: BnNgIdleService
  secondaryTimer: BnNgIdleService

  constructor(
    private alertController: AlertController,
    private sessionService: SessionService,
    private servicemanService: ServicemanService,
    private modalController: ModalController,
    private router: Router
  ) { }

  startPrimaryTimer() {
    if (this.sessionService.getCurrentServiceman() != null) {

      this.validAccess = true
      this.primaryTimer = new BnNgIdleService()

      this.primaryTimer.startWatching(PRIMARY_TIMER_SEC).subscribe((isTimedOut: boolean) => {

        if (isTimedOut) {
          this.primaryTimer.stopTimer()
          this.primaryTimer = new BnNgIdleService()
          this.alertController.dismiss()
          this.presentWarning()
          this.secondaryTimer = new BnNgIdleService()


          this.secondaryTimer.startWatching(SECONARY_TIMER_SEC).subscribe((isSecondaryTimedOut: boolean) => {
            if (isSecondaryTimedOut) {
              this.secondaryTimer.stopTimer()
              this.validAccess = false
            }
          })
        }

      })

    }
  }

  stopAllTimer() {
    try {
      this.primaryTimer.stopTimer()
    } catch (error) {
    }
    try {
      this.secondaryTimer.stopTimer()
    } catch (error) {
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
            this.logoutUser()
          }
        },
        {
          text: 'Yes',
          cssClass: 'activate-button',
          handler: () => {
            if (this.validAccess) {
              this.stopAllTimer()
              this.startPrimaryTimer()
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
            this.logoutUser()
          }
        }
      ]
    })
    await alert.present()
  }

  logoutUser() {
    this.servicemanService.unassignFcmToken().subscribe(
      response => {
        // console.log(response);
      },
      error => {
        console.log(error);
      }
    )
    this.stopAllTimer()
    this.sessionService.setIsLogin(false)
    this.sessionService.setCurrentServiceman(null)
    this.modalController.dismiss()
    this.router.navigate(["/login-screen"])
  }

}
