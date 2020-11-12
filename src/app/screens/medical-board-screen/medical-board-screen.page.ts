import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ModalController } from '@ionic/angular';

import { MedicalBoardCaseWrapper } from 'src/app/classes/medical-board-case-wrapper/medical-board-case-wrapper';
import { ViewOutcomeModalPage } from 'src/app/modals/view-outcome-modal/view-outcome-modal.page';
import { MedicalBoardService } from 'src/app/services/medicalboard/medical-board.service';

@Component({
  selector: 'app-medical-board-screen',
  templateUrl: './medical-board-screen.page.html',
  styleUrls: ['./medical-board-screen.page.scss'],
})
export class MedicalBoardScreenPage implements OnInit {

  passedMedicalBoardId: number

  allMedicalBoardCaseWrappers: MedicalBoardCaseWrapper[]
  upcomingMedicalBoardCaseWrappers: MedicalBoardCaseWrapper[]
  completedMedicalBoardCaseWrappers: MedicalBoardCaseWrapper[]

  medicalBoardCaseWrappersToShow: MedicalBoardCaseWrapper[]

  segmentModel = "upcoming"

  constructor(
    private medicalBoardService: MedicalBoardService,
    private modalController: ModalController,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.passedMedicalBoardId = parseInt(this.activatedRoute.snapshot.paramMap.get('medicalBoardId'));

    this.medicalBoardService.retrieveAllServicemanMedicalBoardCases().subscribe(
      response => {
        this.allMedicalBoardCaseWrappers = response.medicalBoardCases
        this.upcomingMedicalBoardCaseWrappers = []
        this.completedMedicalBoardCaseWrappers = []

        this.allMedicalBoardCaseWrappers.forEach(mbCase => {

          mbCase.scheduledStartDate = this.convertUTCStringToSingaporeDate(mbCase.scheduledStartDate)
          mbCase.scheduledEndDate = this.convertUTCStringToSingaporeDate(mbCase.scheduledEndDate)

          if (mbCase.medicalBoardCase.medicalBoardCaseStatus.toString() === "WAITING" || mbCase.medicalBoardCase.medicalBoardCaseStatus.toString() === "SCHEDULED") {
            this.upcomingMedicalBoardCaseWrappers.push(mbCase)
          }
          else if (mbCase.medicalBoardCase.medicalBoardCaseStatus.toString() === "COMPLETED") {
            mbCase.conditionStatuses.forEach(status => {
              status.conditionStartDate = this.convertUTCStringToSingaporeDate(status.conditionStartDate)
              if (status.conditionStatus.statusEndDate !== undefined) {
                status.conditionStatus.statusEndDate = this.convertUTCStringToSingaporeDate(status.conditionStatus.statusEndDate)
              }
            })
            this.completedMedicalBoardCaseWrappers.push(mbCase)
          }

          for (var idx = 0; idx < this.completedMedicalBoardCaseWrappers.length; idx++) {
            if (this.passedMedicalBoardId === this.completedMedicalBoardCaseWrappers[idx].medicalBoardCase.medicalBoardCaseId) {
              this.segmentModel = "completed"
              break
            }
          }

          this.completedMedicalBoardCaseWrappers.sort((x, y) => (y.scheduledEndDate.getTime() - x.scheduledEndDate.getTime()))
        })
      },
      error => {
        console.log(error);
      }
    )
  }

  async presentViewOutcomeModal(medicalBoardCaseWrapper: MedicalBoardCaseWrapper) {
    const modal = await this.modalController.create({
      component: ViewOutcomeModalPage,
      componentProps: {
        medicalBoardCaseWrapper: medicalBoardCaseWrapper
      }
    });

    return await modal.present();
  }

  segmentChanged(ev: any) {
    // console.log(this.segmentModel);
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
