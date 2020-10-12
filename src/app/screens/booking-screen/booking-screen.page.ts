import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ModalController } from '@ionic/angular';

import { Booking } from 'src/app/classes/booking/booking';
import { BookingSummaryModalPage } from 'src/app/modals/booking-summary-modal/booking-summary-modal.page';
import { SchedulerService } from 'src/app/services/scheduler/scheduler.service';

@Component({
  selector: 'app-booking-screen',
  templateUrl: './booking-screen.page.html',
  styleUrls: ['./booking-screen.page.scss'],
})
export class BookingScreenPage implements OnInit {

  isShown: boolean
  servicemanBookings: Booking[]

  passedSlotId: number

  constructor(
    private modalController: ModalController,
    private schedulerService: SchedulerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ngZone: NgZone
  ) { }

  ngOnInit() {

    this.passedSlotId = parseInt(this.activatedRoute.snapshot.paramMap.get('slotId'))

  }

  ionViewWillEnter() {
    this.isShown = true

    this.schedulerService.retrieveAllServicemanBookings().subscribe(
      response => {
        this.servicemanBookings = response.bookings

        this.servicemanBookings.forEach(sb => {
          sb.bookingSlot.startDateTime = this.convertUTCStringToSingaporeDate(sb.bookingSlot.startDateTime)
          sb.bookingSlot.endDateTime = this.convertUTCStringToSingaporeDate(sb.bookingSlot.endDateTime)
        })

        this.servicemanBookings.sort((x, y) => (x.bookingSlot.slotId - y.bookingSlot.slotId))

        for (var index = 0; index < this.servicemanBookings.length; index++) {
          if (this.servicemanBookings[index].bookingSlot.slotId == this.passedSlotId) {
            this.presentBookingSummary(this.servicemanBookings[index])
            break
          }
        }

      },
      error => {
        console.log(error);
      }
    )
  }

  async presentBookingSummary(booking: Booking) {
    const modal = await this.modalController.create({
      component: BookingSummaryModalPage,
      componentProps: {
        booking: booking
      }
    });
    return await modal.present();
  }

  scrollHandler(event) {
    this.ngZone.run(() => {
      this.isShown = false
    })
  }

  scrollStop(event) {
    this.ngZone.run(() => {
      this.isShown = true
    })
  }

  redirectToBookingParamsScreen() {
    this.router.navigate(["/booking-params-screen"])
  }

  convertUTCStringToSingaporeDate(dateCreated) {
    if (dateCreated != null) {
      let stringUtcTime = dateCreated.toLocaleString().substring(0, 19)
      return new Date(Date.UTC(
        parseInt(stringUtcTime.substring(0, 4)),
        parseInt("" + (+stringUtcTime.substring(5, 7) - 1)),
        parseInt(stringUtcTime.substring(8, 10)),
        parseInt(stringUtcTime.substring(11, 13)),
        parseInt(stringUtcTime.substring(14, 16)),
        parseInt(stringUtcTime.substring(17, 19))
      ));
    }
  }

}
