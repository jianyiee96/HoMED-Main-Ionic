import { Component, OnInit } from '@angular/core';

import { ModalController, NavParams } from '@ionic/angular';

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
    private modalController: ModalController,
    private formService: FormService
  ) {
    this.formInstance = navParam.get("formInstance")
    this.formInstance.formInstanceFields.sort((x, y) => (x.formFieldMapping.position - y.formFieldMapping.position))

    this.processCheckboxValues()
    this.processMultiSelectValues()
  }

  ngOnInit() {
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

  archiveForm() {
    this.formService.archiveFormInstance(this.formInstance).subscribe(
      response => {
        this.dismiss()
      },
      error => {
        console.log('error');
      }
    )
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    })
  }

}
