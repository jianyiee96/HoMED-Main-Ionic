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

  invokeCancelBooking() {

    if (this.sameDay(this.booking.bookingSlot.startDateTime, new Date())) {
      this.presentErrorAlert("Unable to cancel booking scheduled for today");
    } else {
      this.presentCancelConfirm();
    }

  }

  async presentCancelConfirm() {
    const alert = await this.alertController.create({
      header: `Confirm Cancellation of Booking ID ${this.booking.bookingId}?`,
      message: 'Note that this action cannot be <strong>undone</strong>!',
      cssClass: 'homedThemeAlert',
      inputs: [
        {
          name: 'cancelReason',
          type: 'textarea',
          placeholder: 'Reason for cancelling (Optional)'
        }
      ],
      buttons: [
        {
          text: 'Back',
          role: 'cancel',
          cssClass: 'false-button',
          handler: () => { }
        }, {
          text: 'Cancel',
          cssClass: 'delete-button',
          handler: data => {
            this.cancelBooking(data.cancelReason)
          }
        }
      ]
    });

    await alert.present();
  }

  cancelBooking(cancelReason: string) {
    this.schedulerService.cancelBooking(this.booking.bookingId, cancelReason).subscribe(
      response => {
        this.dismissAfterCancelBooking()
      },
      error => {
        this.presentErrorAlert(error.substring(37))
      }
    )
  }

  sameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  }

  async presentErrorAlert(errorMessage: string) {
    const alert = await this.alertController.create({
      header: `Unable to Cancel Booking ID ${this.booking.bookingId}.`,
      message: `Reason: ${errorMessage}.`,
      cssClass: 'homedThemeAlert',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          cssClass: 'true-button',
          handler: () => { }
        }
      ]
    });

    await alert.present();
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  dismissAfterCancelBooking() {
    this.modalController.dismiss({
      'dismissed': true,
      'cancelled': true
    })
  }

  dismissAndRedirect(formInstanceId: number) {
    this.modalController.dismiss({
      'dismissed': true,
      'formInstanceId': formInstanceId
    });
  }

}
