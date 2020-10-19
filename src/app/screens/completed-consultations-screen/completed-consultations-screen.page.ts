import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Consultation } from 'src/app/classes/consultation/consultation';
import { ConsultationService } from 'src/app/services/consultation/consultation.service';

@Component({
  selector: 'app-completed-consultations-screen',
  templateUrl: './completed-consultations-screen.page.html',
  styleUrls: ['./completed-consultations-screen.page.scss'],
})
export class CompletedConsultationsScreenPage implements OnInit {

  completedConsultations: Consultation[]

  constructor(
    private consultationService: ConsultationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.completedConsultations = this.consultationService.completedConsultation
    this.completedConsultations.forEach(cc => {
      cc.startDateTime = this.convertUTCStringToSingaporeDate(cc.startDateTime)
      cc.endDateTime = this.convertUTCStringToSingaporeDate(cc.endDateTime)
    })
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
