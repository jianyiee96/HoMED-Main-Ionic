import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Booking } from 'src/app/classes/booking/booking';
import { Consultation } from 'src/app/classes/consultation/consultation';
import { Serviceman } from 'src/app/classes/serviceman/serviceman';
import { ConsultationService } from 'src/app/services/consultation/consultation.service';
import { FormService } from 'src/app/services/form/form.service';
import { SchedulerService } from 'src/app/services/scheduler/scheduler.service';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.page.html',
  styleUrls: ['./home-screen.page.scss'],
})
export class HomeScreenPage implements OnInit {

  serviceman: Serviceman
  servicemanBookings: Booking[]

  waitingConsultationToShow: Consultation
  positionInQueueToShow: number
  taskCount: number
  upcomingBooking: Booking

  showLoading: boolean = false

  constructor(
    private sessionService: SessionService,
    private schedulerService: SchedulerService,
    private consultationService: ConsultationService,
    private formService: FormService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.serviceman = this.sessionService.getCurrentServiceman()
  }

  ionViewWillEnter() {
    this.upcomingBooking = null
    this.loadHomeContent()
  }

  loadHomeContent() {

    this.consultationService.retrieveServicemanConsultations().subscribe(
      response => {
        var consultations: Consultation[] = response.consultations

        for (var idx = 0; idx < consultations.length; idx++) {
          if (consultations[idx].consultationStatusEnum.toString() == "WAITING") {
            this.waitingConsultationToShow = consultations[idx]

            this.consultationService.retrieveConsultationQueuePosition(this.waitingConsultationToShow.consultationId).subscribe(
              response => {
                this.positionInQueueToShow = response.position
              },
              error => {
                console.log(error);
              }
            )

            break
          }
        }
      },
      error => {
        console.log(error);
      }
    )

    this.schedulerService.retrieveAllServicemanBookings().subscribe(
      response => {
        this.servicemanBookings = response.bookings

        this.servicemanBookings.forEach(sb => {
          sb.bookingSlot.startDateTime = this.convertUTCStringToSingaporeDate(sb.bookingSlot.startDateTime)
          sb.bookingSlot.endDateTime = this.convertUTCStringToSingaporeDate(sb.bookingSlot.endDateTime)
        })

        this.servicemanBookings.sort((x, y) => x.bookingSlot.startDateTime.getTime() - y.bookingSlot.startDateTime.getTime())

        for (var idx = 0; idx < this.servicemanBookings.length; idx++) {
          if (this.servicemanBookings[idx].bookingStatusEnum.toString() == "UPCOMING") {
            this.upcomingBooking = this.servicemanBookings[idx]
            break
          }
        }
      },
      error => {
        console.log(error);
      }
    )

    this.formService.retrieveAllServicemanFormInstances().subscribe(
      response => {
        var allFormInstances = []
        this.taskCount = 0

        allFormInstances = response.formInstances

        allFormInstances.forEach(form => {
          if (form.formInstanceStatusEnum.toString() == "DRAFT") {
            this.taskCount++
          }
        })
      },
      error => {
        console.error(error)
      }
    )

  }

  refreshQueueCard() {
    this.showLoading = true

    this.consultationService.retrieveServicemanConsultations().subscribe(
      response => {
        var consultations: Consultation[] = response.consultations

        for (var idx = 0; idx < consultations.length; idx++) {
          if (consultations[idx].consultationStatusEnum.toString() == "WAITING") {
            this.waitingConsultationToShow = consultations[idx]

            this.consultationService.retrieveConsultationQueuePosition(this.waitingConsultationToShow.consultationId).subscribe(
              response => {
                this.positionInQueueToShow = response.position
                this.showLoading = false
              },
              error => {
                console.log(error);
              }
            )
            break
          }
        }

      },
      error => {
        console.log(error);
        this.showLoading = false
      }
    )
  }

  calculateQueueNumber(id: number) {
    var mod = id % 1000
    return ("000" + mod).slice(-3)
  }

  redirectToFormsScreen() {
    this.router.navigate(['/form-screen'])
  }

  redirectToBookingsScreen() {
    this.router.navigate(['/booking-screen/' + this.upcomingBooking.bookingSlot.slotId])
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
