import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController, NavController } from '@ionic/angular';

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
    private navController: NavController,
    private alertController: AlertController,
    private schedulerService: SchedulerService,
    private consultationService: ConsultationService,
    private medicalCentreService: MedicalCentreService,
    private router: Router,
    private datePipe: DatePipe,
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
    if (this.schedulerService.reasonForBooking == null || this.schedulerService.reasonForBooking.length < 1) {
      this.schedulerService.reasonForBooking = "N.A"
    }

    const startDateTime = this.datePipe.transform(this.filteredBookingSlots[this.selectedSlotIndex].startDateTime, 'HH:mm')
    const endDateTime = this.datePipe.transform(this.filteredBookingSlots[this.selectedSlotIndex].endDateTime, 'HH:mm')
    const date = this.datePipe.transform(this.filteredBookingSlots[this.selectedSlotIndex].startDateTime, 'EEE, MMMM d, y')

    const alert = await this.alertController.create({
      header: 'Confirm Booking',
      subHeader: 'Upon confirmation, you will be redireced to a booking summary page.',
      message: `<b>Medical Centre</b>:<br/>${this.selectedMedicalCentre.name}
                <br/>
                <b>Purpose</b>: ${this.consultationService.selectedConsultationPurposeName}
                <br/>
                <b>Date</b>: ${date}
                <br/>
                <b>Start</b>: ${startDateTime}
                <br/>
                <b>End</b>: ${endDateTime}
                <br/>
                <b>Comment</b>: ${this.schedulerService.reasonForBooking}`,
      cssClass: 'confirmBookingAlert',
      inputs: [
        {
          type: 'checkbox',
          label: 'Pre-Medical Board Review',
          value: true,
          cssClass: 'alertCheckboxInput',
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'cancel-button',
          handler: () => { }
        },
        {
          text: 'Confirm',
          cssClass: 'book-button',
          handler: data => {
            if (this.schedulerService.reasonForBooking == "N.A") {
              // display to client reason is N.A when confirming booking, but will send to backend null 
              this.schedulerService.reasonForBooking = null
            }

            // checkbox unchecked, length is zero
            if (data.length > 0) {
              this.scheduleBooking(true)
            } else if (data.length === 0) {
              this.scheduleBooking(false)
            }
          }
        }
      ],
      backdropDismiss: false
    });

    await alert.present();
  }

  scheduleBooking(isForReview: boolean) {

    this.schedulerService.scheduleBooking(this.consultationService.selectedConsultationPurposeId, this.filteredBookingSlots[this.selectedSlotIndex].slotId, isForReview).subscribe(
      response => {
        this.navController.pop()
        this.router.navigate(['/booking-screen/' + this.filteredBookingSlots[this.selectedSlotIndex].slotId])
      },
      error => {
        console.log(error);
      }
    )

  }

  formatAddress(streetName?: string, unitNumber?: string, buildingName?: string, country?: string, postal?: string) {
    let str = streetName
    if (unitNumber !== undefined && unitNumber.trim() !== "") {
      str += ", " + unitNumber;
    }

    if (buildingName !== undefined && buildingName.trim() !== "") {
      str += ", " + buildingName;
    }

    if (country !== undefined && country.trim() !== "") {
      str += ", " + country;
    }

    if (postal !== undefined && postal.trim() !== "") {
      str += " " + postal;
    }

    return str;
  }

  redirectToBookingParamsScreen() {
    this.router.navigate(['/booking-params-screen'])
  }

}
