import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ActionSheetController, AlertController, ModalController, NavParams } from '@ionic/angular';

import { FormInstance, FormInstanceFieldValue } from 'src/app/classes/form-instance/form-instance';
import { FormService } from 'src/app/services/form/form.service';

@Component({
  selector: 'app-view-submitted-form-modal',
  templateUrl: './view-submitted-form-modal.page.html',
  styleUrls: ['./view-submitted-form-modal.page.scss'],
})
export class ViewSubmittedFormModalPage implements OnInit {

  formInstance: FormInstance

  checkboxState: { [key: number]: boolean } = {}

  multiSelectValues: { [key: number]: string[] } = {}

  constructor(
    private navParam: NavParams,
    private actionSheetController: ActionSheetController,
    private modalController: ModalController,
    private alertController: AlertController,
    private formService: FormService
  ) {
    this.formInstance = navParam.get("formInstance")
    this.formInstance.formInstanceFields.sort((x, y) => (x.formFieldMapping.position - y.formFieldMapping.position))
    this.process()
    this.processCheckboxValues()
    this.processMultiSelectValues()
  }

  ngOnInit() {
  }

  // when backend returns [] for formInstanceFieldValues
  process() {
    this.formInstance.formInstanceFields.forEach(fif => {
      if (fif.formInstanceFieldValues.length == 0) {
        fif.formInstanceFieldValues.push(new FormInstanceFieldValue(undefined, ""))
      } else if (fif.formFieldMapping.inputType == "DATE" && fif.formInstanceFieldValues[0]["inputValue"].length == 10) {
        // 19 / 11 / 2020
        var date = fif.formInstanceFieldValues[0]["inputValue"]
        var day = date.substring(0, 2)
        var month = date.substring(3, 5)
        var year = date.substring(6)

        var formattedDate = year + "-" + month + "-" + day

        fif.formInstanceFieldValues[0]["inputValue"] = formattedDate

      }
    })
  }

  processMultiSelectValues() {
    this.formInstance.formInstanceFields.forEach((fif) => {
      if (fif.formFieldMapping.inputType == "MULTI_DROPDOWN") {
        if (this.multiSelectValues[fif.formInstanceFieldId] == undefined) {
          this.multiSelectValues[fif.formInstanceFieldId] = []
        }

        fif.formInstanceFieldValues.forEach((fifv) => {
          this.multiSelectValues[fif.formInstanceFieldId].push(fifv.inputValue)
        })
      }
    })
  }

  processCheckboxValues() {
    this.formInstance.formInstanceFields.forEach((fif) => {
      if (fif.formFieldMapping.inputType == "CHECK_BOX") {
        fif.formFieldMapping.formFieldOptions.forEach((option) => {

          var isChecked = this.isChecked(option.formFieldOptionValue, fif.formInstanceFieldValues)
          this.checkboxState[option.formFieldOptionId] = isChecked

        })
      }
    })
  }

  // to check if the user has checked the option before
  isChecked(option: string, fifvs: FormInstanceFieldValue[]) {
    var checkedBefore = false
    fifvs.forEach((fifv) => {
      if (option == fifv.inputValue) {
        checkedBefore = true
      }
    })
    return checkedBefore
  }

  async presentOptions() {

    var buttons = [{
      text: 'Booking Summary',
      icon: 'document-text',
      handler: () => {
        this.dismissAndRedirect(this.formInstance.booking.bookingSlot.slotId)
      }
    }, {
      text: 'Archive',
      icon: 'archive',
      handler: () => {
        this.presentArchiveConfirm()
      }
    }, {
      text: 'Cancel',
      icon: 'close',
      role: 'cancel',
      handler: () => { }
    }]

    this.formInstance.booking === undefined ? buttons.splice(0, 1) : null

    const actionSheet = await this.actionSheetController.create({
      header: 'Options',
      cssClass: 'activateAccountAlert',
      buttons: buttons
    })

    await actionSheet.present()

  }

  async presentArchiveConfirm() {
    const alert = await this.alertController.create({
      header: `Confirm Archive of ${this.formInstance.formTemplateMapping.formTemplateName}?`,
      message: 'Note that this action cannot be <strong>undone</strong>!',
      cssClass: 'homedThemeAlert',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'false-button',
          handler: () => { }
        }, {
          text: 'Archive',
          cssClass: 'true-button',
          handler: () => {
            this.archiveForm()
          }
        }
      ]
    });

    await alert.present();
  }

  async presentFailedArchiveAlert(error: string) {
    const alert = await this.alertController.create({
      header: `Failed to archive ${this.formInstance.formTemplateMapping.formTemplateName}?`,
      message: error,
      cssClass: 'activateAccountAlert',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          cssClass: 'cancel-button',
          handler: () => { }
        }
      ]
    });

    await alert.present();
  }

  archiveForm() {
    this.formService.archiveFormInstance(this.formInstance).subscribe(
      response => {
        this.dismiss()
      },
      error => {
        this.presentFailedArchiveAlert(error.substring(37))
      }
    )
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    })
  }

  dismissAndRedirect(slotId: number) {
    this.modalController.dismiss({
      'dismissed': true,
      'slotId': slotId
    });
  }

}
