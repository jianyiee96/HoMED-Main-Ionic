import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { interval, Subscription } from 'rxjs';

import { Booking } from 'src/app/classes/booking/booking';
import { Consultation } from 'src/app/classes/consultation/consultation';
import { MedicalBoardCaseWrapper } from 'src/app/classes/medical-board-case-wrapper/medical-board-case-wrapper';
import { Notification } from 'src/app/classes/notification/notification';
import { Serviceman } from 'src/app/classes/serviceman/serviceman';
import { ConsultationService } from 'src/app/services/consultation/consultation.service';
import { FormService } from 'src/app/services/form/form.service';
import { MedicalBoardService } from 'src/app/services/medicalboard/medical-board.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
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
  upcomingMedicalBoard: MedicalBoardCaseWrapper
  upcomingBooking: Booking
  taskCount: number
  unreadNotificationsCount: number

  pollInterval: number
  showLoading: boolean = false

  intervalSubscription: Subscription

  constructor(
    private sessionService: SessionService,
    private medicalBoardService: MedicalBoardService,
    private schedulerService: SchedulerService,
    private consultationService: ConsultationService,
    private notificationService: NotificationService,
    private formService: FormService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.pollInterval = 3000

    this.intervalSubscription = interval(this.pollInterval).subscribe(_ => {
      this.checkForUnfetchedNotifications()
    })
    this.serviceman = this.sessionService.getCurrentServiceman()
  }

  checkForUnfetchedNotifications() {
    this.notificationService.hasUnfetchedNotifications().subscribe(
      response => {
        response.hasUnfetchedNotifications === true ? this.loadHomeContent() : null
      },
      error => {
        console.log(error);
      }
    )
  }

  ionViewWillEnter() {
    this.upcomingMedicalBoard = null
    this.upcomingBooking = null
    this.loadHomeContent()
  }

  ionViewWillLeave() {
    this.intervalSubscription.unsubscribe()
  }

  loadHomeContent() {

    this.medicalBoardService.retrieveAllServicemanMedicalBoardCases().subscribe(
      response => {
        var medicalBoardCaseWrappers: MedicalBoardCaseWrapper[] = response.medicalBoardCases

        for (var idx = 0; idx < medicalBoardCaseWrappers.length; idx++) {
          if (medicalBoardCaseWrappers[idx].medicalBoardCase.medicalBoardCaseStatus.toString() === "SCHEDULED") {
            this.upcomingMedicalBoard = medicalBoardCaseWrappers[idx]
            this.upcomingMedicalBoard.scheduledStartDate = this.convertUTCStringToSingaporeDate(this.upcomingMedicalBoard.scheduledStartDate)
            this.upcomingMedicalBoard.scheduledEndDate = this.convertUTCStringToSingaporeDate(this.upcomingMedicalBoard.scheduledEndDate)
            break
          }
        }
      },
      error => {
        console.log(error);
      }
    )

    this.consultationService.retrieveServicemanConsultations().subscribe(
      response => {
        var consultations: Consultation[] = response.consultations

        for (var idx = 0; idx < consultations.length; idx++) {
          if (consultations[idx].consultationStatusEnum.toString() === "WAITING") {
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
          else if (consultations[idx].consultationStatusEnum.toString() == "ONGOING") {
            this.waitingConsultationToShow = consultations[idx]
            this.positionInQueueToShow = 0
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

    this.notificationService.retrieveAllServicemanNotifications().subscribe(
      response => {
        this.unreadNotificationsCount = 0
        let retrievedNotifications: Notification[] = response.notifications
        retrievedNotifications.forEach(n => {
          if (!n.isRead) {
            this.unreadNotificationsCount++
          }
        })
      },
      error => {
        console.log(error);
      }
    )

  }

  refreshQueueCard() {
    this.showLoading = true

    this.consultationService.retrieveServicemanConsultations().subscribe(
      response => {
        var consultations: Consultation[] = response.consultations

        let hasWaiting = false;

        for (var idx = 0; idx < consultations.length; idx++) {
          if (consultations[idx].consultationStatusEnum.toString() == "WAITING") {
            this.waitingConsultationToShow = consultations[idx]
            hasWaiting = true
            this.consultationService.retrieveConsultationQueuePosition(this.waitingConsultationToShow.consultationId).subscribe(
              response => {
                this.positionInQueueToShow = response.position
                this.showLoading = false
              },
              error => {
                console.log(error);
                this.showLoading = false
              }
            )
            break
          } else if (consultations[idx].consultationStatusEnum.toString() == "ONGOING") {
            hasWaiting = true
            this.waitingConsultationToShow = consultations[idx]
            this.positionInQueueToShow = 0
            this.showLoading = false
            break
          }
        }

        if (!hasWaiting) {
          this.positionInQueueToShow = null
          this.showLoading = false
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

  redirectToMedicalBoardScreen() {
    this.router.navigate(['/medical-board-screen'])
  }

  redirectToFormsScreen() {
    this.router.navigate(['/form-screen'])
  }

  redirectToBookingsScreen() {
    this.router.navigate(['/booking-screen/' + this.upcomingBooking.bookingId])
  }

  redirectToNotificationsScreen() {
    this.router.navigate(['/notification-screen'])
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
