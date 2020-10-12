import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { MedicalCentre } from 'src/app/classes/medical-centre/medical-centre';

import { BookingSlot } from 'src/app/classes/slot/slot';
import { ConsultationService } from 'src/app/services/consultation/consultation.service';
import { MedicalCentreService } from 'src/app/services/medicalcentre/medical-centre.service';
import { SchedulerService } from 'src/app/services/scheduler/scheduler.service';

@Component({
  selector: 'app-booking-slots-screen',
  templateUrl: './booking-slots-screen.page.html',
  styleUrls: ['./booking-slots-screen.page.scss'],
})
export class BookingSlotsScreenPage implements OnInit {

  bookingSlots: BookingSlot[]
  filteredBookingSlots: BookingSlot[] = []

  selectedSlotIndex: number
  selectedDate: Date
  selectedMedicalCentre: MedicalCentre

  constructor(
    private alertController: AlertController,
    private schedulerService: SchedulerService,
    private consultationService: ConsultationService,
    private medicalCentreService: MedicalCentreService,
    private router: Router
  ) { }

  ngOnInit() {
    this.selectedMedicalCentre = this.medicalCentreService.selectedMedicalCentre
  }

  ionViewWillEnter() {

    this.selectedDate = this.schedulerService.selectedDate
    this.bookingSlots = this.schedulerService.bookingSlots
    this.bookingSlots.forEach(bs => {

      const currDate = new Date()
      const recvDate = new Date(bs.startDateTime)

      if (recvDate > currDate) {
        if (bs.booking == null || bs.booking.bookingStatusEnum.toString() != "CANCELLED") {
          this.filteredBookingSlots.push(bs)
        }
      }

    })

  }

  async confirmBookingPrompt() {
    const alert = await this.alertController.create({
      header: 'Confirm Booking',
      subHeader: this.filteredBookingSlots[this.selectedSlotIndex].startDateTime.toLocaleTimeString() + ' to ' + this.filteredBookingSlots[this.selectedSlotIndex].endDateTime.toLocaleTimeString() + ' at ' + this.selectedMedicalCentre.name,
      message: 'Upon confirmation, you will be redireced to a booking summary page.',
      cssClass: 'activateAccountAlert',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'cancel-button',
          handler: () => { }
        },
        {
          text: 'Confirm',
          cssClass: 'activate-button',
          handler: () => {
            this.scheduleBooking()
          }
        }
      ],
      backdropDismiss: false
    });

    await alert.present();
  }

  scheduleBooking() {

    this.schedulerService.scheduleBooking(this.consultationService.selectedConsultationPurposeId, this.filteredBookingSlots[this.selectedSlotIndex].slotId).subscribe(
      response => {
        this.router.navigate(['/booking-screen/' + this.filteredBookingSlots[this.selectedSlotIndex].slotId])
      },
      error => {
        console.log(error);
      }
    )

  }

  redirectToBookingParamsScreen() {
    this.router.navigate(['/booking-params-screen'])
  }

}
