import { Component, OnInit } from '@angular/core';

import { ModalController, NavParams } from '@ionic/angular';

import { FormInstance, FormInstanceFieldValue } from 'src/app/classes/form-instance/form-instance';

@Component({
  selector: 'app-view-submitted-form-modal',
  templateUrl: './view-submitted-form-modal.page.html',
  styleUrls: ['./view-submitted-form-modal.page.scss'],
})
export class ViewSubmittedFormModalPage implements OnInit {

  formInstance: FormInstance

  checkboxState: { [key: number]: boolean } = {}

  multiSelectValues: { [key: number]: string[]} = {} 

  constructor(
    private navParam: NavParams,
    private modalController: ModalController
  ) {
    this.formInstance = navParam.get("formInstance")
    this.formInstance.formInstanceFields.sort((x, y) => (x.formFieldMapping.position - y.formFieldMapping.position))
    console.log(this.formInstance);
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

      // this.formInstanceInputNgModels[fif.formInstanceFieldId].forEach((fifv) => {

      //   if (this.formInstanceInputNgModelsMultiSelect[fif.formInstanceFieldId] == undefined) {
      //     this.formInstanceInputNgModelsMultiSelect[fif.formInstanceFieldId] = []
      //   }
      //   // multi_dropdown selected values need to be loaded in a string[] for comparison in View
      //   this.formInstanceInputNgModelsMultiSelect[fif.formInstanceFieldId].push(fifv.inputValue)

      // })
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

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    })
  }

}
