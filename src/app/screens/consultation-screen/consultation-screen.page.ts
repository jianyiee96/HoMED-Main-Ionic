import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Consultation } from 'src/app/classes/consultation/consultation';
import { ConsultationService } from 'src/app/services/consultation/consultation.service';

@Component({
  selector: 'app-consultation-screen',
  templateUrl: './consultation-screen.page.html',
  styleUrls: ['./consultation-screen.page.scss'],
})
export class ConsultationScreenPage implements OnInit {

  passedConsultationId: number

  consultations: Consultation[]

  constructor(
    private consultationService: ConsultationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.passedConsultationId = parseInt(this.activatedRoute.snapshot.paramMap.get('consultationId'));

    this.consultationService.retrieveServicemanConsultations().subscribe(
      response => {
        this.consultations = response.consultations

        this.consultationService.waitingConsultation = []
        this.consultationService.ongoingConsultation = []
        this.consultationService.completedConsultation = []

        this.consultations.forEach(consultation => {
          if (consultation.consultationStatusEnum.toString() == "WAITING") {
            this.consultationService.waitingConsultation.push(consultation)
            if (this.passedConsultationId === consultation.consultationId) {
              this.redirectToWaitingConsultations()
            }
          }
          else if (consultation.consultationStatusEnum.toString() == "ONGOING") {
            this.consultationService.ongoingConsultation.push(consultation)
          }
          else if (consultation.consultationStatusEnum.toString() == "COMPLETED") {
            this.consultationService.completedConsultation.push(consultation)
            if (this.passedConsultationId === consultation.consultationId) {
              this.redirectToCompletedConsultations()
            }
          }
        })
      },
      error => {
        console.log(error);
      }
    )
  }

  redirectToWaitingConsultations() {
    this.router.navigate(['/waiting-consultations-screen'])
  }

  redirectToCompletedConsultations() {
    this.router.navigate(['/completed-consultations-screen'])
  }

}
