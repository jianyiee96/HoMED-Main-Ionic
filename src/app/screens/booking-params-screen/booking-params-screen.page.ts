import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ConsultationPurpose } from 'src/app/classes/consultation-purpose/consultation-purpose';
import { MedicalCentre } from 'src/app/classes/medical-centre/medical-centre';
import { Serviceman } from 'src/app/classes/serviceman/serviceman';
import { BookingSlot } from 'src/app/classes/slot/slot';
import { ConsultationService } from 'src/app/services/consultation/consultation.service';
import { MedicalCentreService } from 'src/app/services/medicalcentre/medical-centre.service';
import { SchedulerService } from 'src/app/services/scheduler/scheduler.service';
import { SessionService } from 'src/app/services/session/session.service';


@Component({
  selector: 'app-booking-params-screen',
  templateUrl: './booking-params-screen.page.html',
  styleUrls: ['./booking-params-screen.page.scss'],
})
export class BookingParamsScreenPage implements OnInit {

  serviceman: Serviceman

  consultationPurposes: ConsultationPurpose[]
  medicalCentres: MedicalCentre[]
  bookingSlots: BookingSlot[]

  selectedConsulationPurposeId: number
  selectedMedicalCentreIndex: number
  selectedDate: Date

  currentDate = new Date()
  maxYear = new Date().getFullYear() + 1

  constructor(
    private consultationService: ConsultationService,
    private medicalCentreService: MedicalCentreService,
    private schedulerService: SchedulerService,
    private sessionService: SessionService,
    private router: Router
  ) { }

  ngOnInit() {
    this.serviceman = this.sessionService.getCurrentServiceman()
  }

  ionViewWillEnter() {

    this.selectedConsulationPurposeId = null
    this.selectedMedicalCentreIndex = null
    this.selectedDate = null

    this.consultationService.retrieveAllConsultationPurposes().subscribe(
      response => {
        this.consultationPurposes = response.consultationPurposes
      },
      error => {
        console.log(error);
      }
    )
    this.medicalCentreService.retrieveAllMedicalCentres().subscribe(
      response => {
        this.medicalCentres = response.medicalCentres
      },
      error => {
        console.log(error);
      }
    )

  }

  queryBookingSlots() {

    var formattedSelectedDate = new Date(this.selectedDate)

    this.schedulerService.queryBookingSlots(this.medicalCentres[this.selectedMedicalCentreIndex].medicalCentreId, formattedSelectedDate).subscribe(
      response => {
        this.bookingSlots = response.bookingSlots
        this.bookingSlots.forEach((bs) => {

          bs.startDateTime = this.convertUTCStringToSingaporeDate(bs.startDateTime)
          bs.endDateTime = this.convertUTCStringToSingaporeDate(bs.endDateTime)

        })

        this.schedulerService.bookingSlots = this.bookingSlots
        this.schedulerService.selectedDate = formattedSelectedDate
        this.consultationService.selectedConsultationPurposeId = this.selectedConsulationPurposeId
        this.medicalCentreService.selectedMedicalCentre = this.medicalCentres[this.selectedMedicalCentreIndex]

        this.redirectToBookingSlotsScreen()
      },
      error => {
        console.log(error);
      }
    )

  }

  singleDropdownOptions: any = {
    cssClass: 'activateAccountAlert'
  }

  checkParamsFilled() {
    return this.selectedConsulationPurposeId != null && this.selectedMedicalCentreIndex != null && this.selectedDate != null
  }

  redirectToBookingSlotsScreen() {
    this.router.navigate(["/booking-slots-screen"])
  }

  redirectToBookingScreen() {
    this.router.navigate(["/booking-screen"])
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
