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

  passedBookingId: number

  servicemanBookings: Booking[] = []
  servicemanBookingsToShow: Booking[] = []

  filters = ['PAST', 'UPCOMING', 'ABSENT', 'CANCELLED']
  selectedFilters = []

  displayModalAllowed: boolean = true

  constructor(
    private modalController: ModalController,
    private schedulerService: SchedulerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.retrieveAllServicemanBookings(false)
  }

  ionViewWillEnter() {
    this.isShown = true
    this.passedBookingId = parseInt(this.activatedRoute.snapshot.paramMap.get('bookingId'));

    if (this.displayModalAllowed) {
      // console.log(`displayModalAllowed was allowed`);

      if (!isNaN(this.passedBookingId)) {
        this.displayModalAllowed = false
        this.retrieveAllServicemanBookings(true)
      }
    }
  }

  retrieveAllServicemanBookings(displayModal: boolean) {

    this.schedulerService.retrieveAllServicemanBookings().subscribe(
      response => {
        this.servicemanBookingsToShow = []
        this.servicemanBookings = response.bookings

        this.servicemanBookings.forEach(sb => {
          sb.bookingSlot.startDateTime = this.convertUTCStringToSingaporeDate(sb.bookingSlot.startDateTime)
          sb.bookingSlot.endDateTime = this.convertUTCStringToSingaporeDate(sb.bookingSlot.endDateTime)
        })

        for (var idx = 0; idx < this.servicemanBookings.length; idx++) {
          if (this.servicemanBookings[idx].bookingStatusEnum.toString() == "UPCOMING") {
            this.selectedFilters = ['UPCOMING']
            this.applyFilter()
            break
          }
        }
        if (this.servicemanBookingsToShow.length == 0) {
          this.selectedFilters = ['PAST', 'ABSENT', 'CANCELLED']
          this.applyFilter()
        }

        if (displayModal) {
          for (var idx = 0; idx < this.servicemanBookings.length; idx++) {
            if (this.passedBookingId == this.servicemanBookings[idx].bookingId) {
              this.presentBookingSummary(this.servicemanBookings[idx])
            }
          }
        }
      },
      error => {
        console.log(error);
      }
    )

  }

  applyFilter() {
    this.servicemanBookingsToShow = []
    this.servicemanBookings.forEach(sb => {
      if (this.selectedFilters.includes(sb.bookingStatusEnum.toString())) {
        this.servicemanBookingsToShow.push(sb)
      }
    })
    this.servicemanBookingsToShow.sort((x, y) => x.bookingSlot.startDateTime.getTime() - y.bookingSlot.startDateTime.getTime())
  }

  async presentBookingSummary(booking: Booking) {
    const modal = await this.modalController.create({
      component: BookingSummaryModalPage,
      componentProps: {
        booking: booking
      }
    });

    modal.onDidDismiss().then((value) => {
      if (value.data["formInstanceId"] != null) {
        this.displayModalAllowed = true
        this.router.navigate(['/form-screen/' + value.data["formInstanceId"]])
      } else if (value.data["cancelled"] == true) {
        this.retrieveAllServicemanBookings(false)
      }

    })

    return await modal.present();
  }

  filterCSS: any = {
    cssClass: 'activateAccountAlert'
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
