import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BnNgIdleService } from 'bn-ng-idle';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  constructor(
    private bnIdle: BnNgIdleService,
    private alertController: AlertController,
    private sessionService: SessionService,
    private router: Router) { }

  startTimer() {
    this.bnIdle = new BnNgIdleService()
    console.log("Starting timer for mobile application.")

    this.bnIdle.startWatching(900).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
        this.bnIdle.stopTimer()
        this.presentAlert()
      }
    });
  }

  stopTimer() {
    console.log("Stopping timer for mobile application.")
    this.bnIdle.stopTimer()
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'You have been inactive for the past 15 minutes.',
      backdropDismiss: false,
      message: 'You will have to log back in for security reasons.',
      buttons: [
        {
          text: 'Logout',
          role: 'cancel',
          handler: () => {
            this.sessionService.setIsLogin(false)
            this.sessionService.setCurrentServiceman(null)
            this.router.navigate(["/login-screen"])
            return
          }
        }
      ],
    });

    await alert.present();
  }

}
