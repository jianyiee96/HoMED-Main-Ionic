import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ModalController } from '@ionic/angular';

import { Booking } from 'src/app/classes/booking/booking';
import { Consultation } from 'src/app/classes/consultation/consultation';
import { BookingSummaryModalPage } from 'src/app/modals/booking-summary-modal/booking-summary-modal.page';
import { ConsultationService } from 'src/app/services/consultation/consultation.service';

@Component({
  selector: 'app-waiting-consultations-screen',
  templateUrl: './waiting-consultations-screen.page.html',
  styleUrls: ['./waiting-consultations-screen.page.scss'],
})
export class WaitingConsultationsScreenPage implements OnInit {

  waitingConsultations: Consultation[]
  queueInformation: { [key: number]: number } = {}

  constructor(
    private consultationService: ConsultationService,
    private modalController: ModalController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.waitingConsultations = this.consultationService.waitingConsultation
    this.waitingConsultations.forEach(wc => {
      wc.booking.bookingSlot.startDateTime = this.convertUTCStringToSingaporeDate(wc.booking.bookingSlot.startDateTime)
      wc.booking.bookingSlot.endDateTime = this.convertUTCStringToSingaporeDate(wc.booking.bookingSlot.endDateTime)

      wc.joinQueueDateTime = this.convertUTCStringToSingaporeDate(wc.joinQueueDateTime)
    })

    this.loadQueueInformation()
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
        this.router.navigate(['/form-screen/' + value.data["formInstanceId"]])
      }

    })

    return await modal.present();
  }

  loadQueueInformation() {
    this.waitingConsultations.forEach(wc => {
      this.consultationService.retrieveConsultationQueuePosition(wc.consultationId).subscribe(
        response => {
          this.queueInformation[wc.consultationId] = response.position
        },
        error => {
          console.log(error);
        }
      )
    })
  }

  loadQueuePositions(consultationId: number) {
    this.consultationService.retrieveConsultationQueuePosition(consultationId).subscribe(
      response => {
        return response.position
      },
      error => {
        console.log(error);
      }
    )
  }

  calculateQueueNumber(consultation: Consultation) {
    var mod = consultation.booking.bookingId % 1000
    return ("000" + mod).slice(-3)
  }

  redirectToConsultationsScreen() {
    this.router.navigate(['/consultation-screen'])
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
