import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ModalController } from '@ionic/angular';

import { MedicalBoardCaseWrapper } from 'src/app/classes/medical-board-case-wrapper/medical-board-case-wrapper';

@Component({
  selector: 'app-view-outcome-modal',
  templateUrl: './view-outcome-modal.page.html',
  styleUrls: ['./view-outcome-modal.page.scss'],
})
export class ViewOutcomeModalPage implements OnInit {

  medicalBoardCaseWrapper: MedicalBoardCaseWrapper

  constructor(
    private modalController: ModalController,
    private router: Router,
  ) { }

  ngOnInit() {
    console.log(this.medicalBoardCaseWrapper);
  }

  redirectToMyStatuses() {
    this.modalController.dismiss({
      'dismissed': true
    }).then(_ => {
      this.router.navigate(['/status-screen'])
    })
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
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
