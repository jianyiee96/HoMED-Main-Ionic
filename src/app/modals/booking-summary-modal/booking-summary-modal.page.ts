import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController, ModalController, NavParams } from '@ionic/angular';

import { Booking } from 'src/app/classes/booking/booking';
import { SchedulerService } from 'src/app/services/scheduler/scheduler.service';

@Component({
  selector: 'app-booking-summary-modal',
  templateUrl: './booking-summary-modal.page.html',
  styleUrls: ['./booking-summary-modal.page.scss'],
})
export class BookingSummaryModalPage implements OnInit {

  booking: Booking

  constructor(
    private alertController: AlertController,
    private modalController: ModalController,
    private schedulerService: SchedulerService,
    private navParam: NavParams,
    private router: Router
  ) {
    this.booking = navParam.get("booking")
  }

  ngOnInit() {
  }

  async presentCancelConfirm() {
    const alert = await this.alertController.create({
      header: `Confirm Cancellation of Booking ID ${this.booking.bookingId}?`,
      message: 'Note that this action cannot be <strong>undone</strong>!',
      cssClass: 'homedThemeAlert',
      buttons: [
        {
          text: 'Back',
          role: 'cancel',
          cssClass: 'false-button',
          handler: () => { }
        }, {
          text: 'Cancel',
          cssClass: 'delete-button',
          handler: () => {
            this.cancelBooking()
          }
        }
      ]
    });

    await alert.present();
  }

  cancelBooking() {
    this.schedulerService.cancelBooking(this.booking.bookingId).subscribe(
      response => {
        this.dismiss()
      },
      error => {
        console.log(error);
      }
    )
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  dismissAndRedirect(formInstanceId: number) {
    this.modalController.dismiss({
      'dismissed': true,
      'formInstanceId': formInstanceId
    });
  }

}
