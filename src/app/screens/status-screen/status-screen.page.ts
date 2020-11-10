import { Component, OnInit } from '@angular/core';
import { ConditionStatusWrapper } from 'src/app/classes/medical-board-case-wrapper/medical-board-case-wrapper';
import { MedicalBoardService } from 'src/app/services/medicalboard/medical-board.service';

@Component({
  selector: 'app-status-screen',
  templateUrl: './status-screen.page.html',
  styleUrls: ['./status-screen.page.scss'],
})
export class StatusScreenPage implements OnInit {

  allConditionStatusWrappers: ConditionStatusWrapper[]
  activeConditionStatusWrappers: ConditionStatusWrapper[]
  expiredConditionStatusWrappers: ConditionStatusWrapper[]

  segmentModel = "activeStatuses"

  constructor(
    private medicalBoardService: MedicalBoardService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.medicalBoardService.retrieveAllServicemanStatuses().subscribe(
      response => {
        this.allConditionStatusWrappers = response.conditionStatuses
        this.activeConditionStatusWrappers = []
        this.expiredConditionStatusWrappers = []

        this.allConditionStatusWrappers.forEach(status => {

          status.conditionStartDate = this.convertUTCStringToSingaporeDate(status.conditionStartDate)

          if (status.conditionStatus.statusEndDate !== undefined) {
            status.conditionStatus.statusEndDate = this.convertUTCStringToSingaporeDate(status.conditionStatus.statusEndDate)

            if (this.checkIsStatusStillActive(status.conditionStatus.statusEndDate.getTime())) {
              this.activeConditionStatusWrappers.push(status)
            } else {
              this.expiredConditionStatusWrappers.push(status)
            }

          } else {
            this.activeConditionStatusWrappers.push(status)
          }

        })
      },
      error => {
        console.log(error);
      }
    )
  }

  segmentChanged(ev: any) {
    console.log(this.segmentModel);
  }

  checkIsStatusStillActive(expiredDate: number) {
    let currentDate = new Date()
    let currentDateInNumbers = currentDate.getTime()

    if (expiredDate < currentDateInNumbers) {
      return true
    }
    return false
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
