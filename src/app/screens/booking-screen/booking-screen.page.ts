import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Booking } from 'src/app/classes/booking/booking';
import { SchedulerService } from 'src/app/services/scheduler/scheduler.service';

@Component({
  selector: 'app-booking-screen',
  templateUrl: './booking-screen.page.html',
  styleUrls: ['./booking-screen.page.scss'],
})
export class BookingScreenPage implements OnInit {

  isShown: boolean
  servicemanBookings: Booking[]

  constructor(
    private schedulerService: SchedulerService,
    private router: Router,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.isShown = true

    this.schedulerService.retrieveAllServicemanBookings().subscribe(
      response => {
        this.servicemanBookings = response.bookings
        console.log(this.servicemanBookings);
      },
      error => {
        console.log(error);
      }
    )
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

}
