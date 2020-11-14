import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NavController } from '@ionic/angular';

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

  selectedConsulationPurposeId: number = null
  selectedMedicalCentreIndex: number = null
  selectedDate: Date = null
  reasonForBooking: string = null

  currentDate = new Date()
  maxYear = new Date().getFullYear() + 1

  constructor(
    private navController: NavController,
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
        this.schedulerService.reasonForBooking = this.reasonForBooking
        this.consultationService.selectedConsultationPurposeId = this.selectedConsulationPurposeId
        for (var idx = 1; idx < this.consultationPurposes.length; idx++) {
          if (this.consultationPurposes[idx].consultationPurposeId = this.consultationService.selectedConsultationPurposeId) {
            this.consultationService.selectedConsultationPurposeName = this.consultationPurposes[idx].consultationPurposeName
            break
          }
        }
        this.medicalCentreService.selectedMedicalCentre = this.medicalCentres[this.selectedMedicalCentreIndex]

        this.redirectToBookingSlotsScreen()
      },
      error => {
        console.log(error);
      }
    )

  }

  singleDropdownOptions: any = {
    cssClass: 'selectBookingParamsAlert'
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

  checkParamsFilled() {
    return this.selectedConsulationPurposeId != null && this.selectedMedicalCentreIndex != null && this.selectedDate != null
  }

  redirectToBookingSlotsScreen() {
    this.router.navigate(["/booking-slots-screen"])
  }

  redirectToBookingScreen() {
    this.navController.pop()
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
