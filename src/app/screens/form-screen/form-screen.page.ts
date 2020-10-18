import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { FormInstance } from 'src/app/classes/form-instance/form-instance';
import { EditFormInstanceModalPage } from 'src/app/modals/edit-form-instance-modal/edit-form-instance-modal.page';
import { ViewSubmittedFormModalPage } from 'src/app/modals/view-submitted-form-modal/view-submitted-form-modal.page';
import { FormService } from 'src/app/services/form/form.service';

@Component({
  selector: 'app-form-screen',
  templateUrl: './form-screen.page.html',
  styleUrls: ['./form-screen.page.scss'],
})
export class FormScreenPage implements OnInit {

  allFormInstances: FormInstance[] = []
  formInstances: FormInstance[] = []
  archivedFormInstances: FormInstance[] = []

  isShown: boolean
  viewArchived: boolean

  passedFormInstanceId: number

  constructor(
    private modalController: ModalController,
    private formService: FormService,
    private ngZone: NgZone,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.isShown = true
    this.passedFormInstanceId = parseInt(this.activatedRoute.snapshot.paramMap.get('formInstanceId'));

    this.retrieveAllServicemanFormInstances(true)
  }

  scrollHandler(event) {
    this.ngZone.run(() => {
      this.isShown = false
    })
  }

  scrollStop(event) {
    this.ngZone.run(() => {
      this.isShown = true
    })
  }

  redirectToModal(formInstance: FormInstance) {
    if (formInstance.formInstanceStatusEnum.toString() == "DRAFT") {
      this.editFormInstance(formInstance)
    } else {
      this.viewFormInstance(formInstance)
    }
  }

  toggleView() {
    this.viewArchived = !this.viewArchived
  }

  async editFormInstance(formInstance: FormInstance) {
    const modal = await this.modalController.create({
      component: EditFormInstanceModalPage,
      componentProps: {
        formInstance: formInstance
      }
    });

    modal.onDidDismiss().then((value) => {

      if (value.data["slotId"] != null) {
        this.router.navigate(['/booking-screen/' + value.data["slotId"]])
      } else {
        this.retrieveAllServicemanFormInstances(false)
      }

    })

    return await modal.present();
  }

  async viewFormInstance(formInstance: FormInstance) {
    const modal = await this.modalController.create({
      component: ViewSubmittedFormModalPage,
      componentProps: {
        formInstance: formInstance
      }
    });

    modal.onDidDismiss().then((value) => {
      if (value.data["slotId"] != null) {
        this.router.navigate(['/booking-screen/' + value.data["slotId"]])
      } else {
        this.retrieveAllServicemanFormInstances(false)
      }
    })

    return await modal.present();
  }

  retrieveAllServicemanFormInstances(displayModal: boolean) {
    this.formService.retrieveAllServicemanFormInstances().subscribe(
      response => {
        this.allFormInstances = response.formInstances
        this.archivedFormInstances = []
        this.formInstances = []

        this.allFormInstances.forEach(formInstance => {
          formInstance.dateCreated = this.convertUTCStringToSingaporeDate(formInstance.dateCreated)
          formInstance.dateSubmitted = this.convertUTCStringToSingaporeDate(formInstance.dateSubmitted)

          if (formInstance.formInstanceStatusEnum.toString() == "ARCHIVED") {
            this.archivedFormInstances.push(formInstance)
          } else {
            this.formInstances.push(formInstance)
          }
        })
        this.formInstances.sort(function (a, b) {
          return b.dateCreated.getTime() - a.dateCreated.getTime()
        })
        this.formInstances.sort(function (a, b) {
          return b.dateCreated.getTime() - a.dateCreated.getTime()
        })

        if (displayModal) {
          for (var idx = 0; idx < this.allFormInstances.length; idx++) {
            if (this.passedFormInstanceId == this.allFormInstances[idx].formInstanceId) {
              this.redirectToModal(this.allFormInstances[idx])
              break
            }
          }
        }

      },
      error => {
        console.error(error)
      }
    )
  }

  redirectToFormRepo() {
    this.router.navigate(["/form-repository-screen"])
  }

  convertUTCStringToSingaporeDate(dateCreated) {
    if (dateCreated != null) {
      let stringUtcTime = dateCreated.toLocaleString().substring(0, 19)
      return new Date(Date.UTC(
        parseInt(stringUtcTime.substring(0, 4)),
        parseInt("" + (+(stringUtcTime.substring(5, 7)) - 1)),
        parseInt(stringUtcTime.substring(8, 10)),
        parseInt(stringUtcTime.substring(11, 13)),
        parseInt(stringUtcTime.substring(14, 16)),
        parseInt(stringUtcTime.substring(17, 19))
      ));
    }
  }

}
