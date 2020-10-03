import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ActionSheetController, AlertController, ModalController, NavParams, ToastController } from '@ionic/angular';

import { FormInstance, FormInstanceFieldValue } from 'src/app/classes/form-instance/form-instance';
import { FormService } from 'src/app/services/form/form.service';

@Component({
  selector: 'app-edit-form-instance-modal',
  templateUrl: './edit-form-instance-modal.page.html',
  styleUrls: ['./edit-form-instance-modal.page.scss'],
})
export class EditFormInstanceModalPage implements OnInit {

  formInstance: FormInstance

  checkboxState: { [key: number]: boolean } = {}

  formInstanceInputNgModels: { [key: number]: FormInstanceFieldValue[] } = {}

  formInstanceInputNgModelsMultiSelect: { [key: number]: string[] } = {}

  formInstanceErrorChips: { [key: number]: boolean } = {}

  declarationChecked: boolean

  declarationRequiredShow: boolean

  constructor(
    private modalController: ModalController,
    private navParam: NavParams,
    private formService: FormService,
    private actionSheetController: ActionSheetController,
    private toastController: ToastController,
    private alertController: AlertController,
  ) {
    this.formInstance = navParam.get("formInstance")
    this.formInstance.formInstanceFields.sort((x, y) => (x.formFieldMapping.position - y.formFieldMapping.position))

    this.unloadNgModels()
  }

  ionViewWillEnter() {
    this.declarationChecked = false
    this.declarationRequiredShow = false
  }

  ngOnInit() {
  }

  // unloading the backend data to local JSON object, "formInstanceInputNgModels" for binding
  // e.g. {
  //         "${fif.formInstanceFieldId}": 
  //         [
  //           {"formInstanceFieldValueId":38,"inputValue":"chicken"},
  //           {"formInstanceFieldValueId":40,"inputValue":"fish"}
  //         ]
  //      }
  unloadNgModels() {
    this.formInstance.formInstanceFields.forEach((fif) => {

      this.formInstanceInputNgModels[fif.formInstanceFieldId] = fif.formInstanceFieldValues

      if (fif.formFieldMapping.inputType == "CHECK_BOX") {
        fif.formFieldMapping.formFieldOptions.forEach((option) => {

          var isChecked = this.isChecked(option.formFieldOptionValue, fif.formInstanceFieldValues)
          this.checkboxState[option.formFieldOptionId] = isChecked

        })
      }
      else if (fif.formFieldMapping.inputType == "MULTI_DROPDOWN") {

        // necessary to check and load any values the user has selected before
        if (this.formInstanceInputNgModels[fif.formInstanceFieldId].length > 0) {

          this.formInstanceInputNgModels[fif.formInstanceFieldId].forEach((fifv) => {

            if (this.formInstanceInputNgModelsMultiSelect[fif.formInstanceFieldId] == undefined) {
              this.formInstanceInputNgModelsMultiSelect[fif.formInstanceFieldId] = []
            }
            // multi_dropdown selected values need to be loaded in a string[] for comparison in View
            this.formInstanceInputNgModelsMultiSelect[fif.formInstanceFieldId].push(fifv.inputValue)

          })

        }

      }
      else if (this.formInstanceInputNgModels[fif.formInstanceFieldId].length == 0) {

        // only called if the form has not been saved before; meaning will have null fifv
        this.injectEmptyFormInstanceFieldValue(fif.formInstanceFieldId)

      }

    })
  }

  loadNgModels() {

    for (let i = 0; i < this.formInstance.formInstanceFields.length; i++) {

      let fif = this.formInstance.formInstanceFields[i]

      // have to 'clean' the fifvs for checkbox, as backend model does not have 'isChecked' property
      if (fif.formFieldMapping.inputType == "CHECK_BOX") {

        let newFifvs = []

        fif.formFieldMapping.formFieldOptions.forEach(ffo => {
          if (this.checkboxState[ffo.formFieldOptionId]) {
            let newFifv = new FormInstanceFieldValue(undefined, ffo.formFieldOptionValue, undefined)
            newFifvs.push(newFifv)
            // console.log("Loading value: " + newFifv.inputValue)
          }
        })

        fif.formInstanceFieldValues = newFifvs

      }
      else if (fif.formFieldMapping.inputType == "MULTI_DROPDOWN") {

        this.formInstanceInputNgModels[fif.formInstanceFieldId] = []

        if (this.formInstanceInputNgModelsMultiSelect[fif.formInstanceFieldId] != undefined) {
          this.formInstanceInputNgModelsMultiSelect[fif.formInstanceFieldId].forEach((option) => {
            const newFifv = new FormInstanceFieldValue(undefined, option, undefined)
            this.formInstanceInputNgModels[fif.formInstanceFieldId].push(newFifv)
          })
        }
        fif.formInstanceFieldValues = this.formInstanceInputNgModels[fif.formInstanceFieldId]

      }
      else {
        fif.formInstanceFieldValues = this.formInstanceInputNgModels[fif.formInstanceFieldId]
      }

    }

  }

  // necessary so that the view objects can be binded to inputValue, even if its an empty string
  injectEmptyFormInstanceFieldValue(formInstanceFieldId: number) {
    this.formInstanceInputNgModels[formInstanceFieldId].push(new FormInstanceFieldValue(undefined, "", undefined))
  }

  // necessary so that the checkbox values will have a 'checked' property; this will be an additional object that is stored locally
  injectCheckboxFormInstanceFieldValue(formInstanceFieldId: number, option: string, isChecked: boolean) {
    this.formInstanceInputNgModels[formInstanceFieldId].push(new FormInstanceFieldValue(undefined, option, isChecked))
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

  async presentOptions(form: NgForm) {

    const actionSheet = await this.actionSheetController.create({
      header: 'Options',
      cssClass: 'activateAccountAlert',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.presentDeleteConfirm()
        }
      }, {
        text: 'Save',
        icon: 'save',
        handler: () => {
          this.update(form)
        }
      }, {
        text: 'Consultations',
        icon: 'git-network',
        handler: () => {
          console.log('Consultations clicked')
        }
      }, {
        text: 'Submit',
        icon: 'send',
        handler: () => {
          this.submit(form)
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => { }
      }]
    })

    await actionSheet.present()

  }

  async presentDeleteConfirm() {
    const alert = await this.alertController.create({
      header: `Confirm Deletion of ${this.formInstance.formTemplateMapping.formTemplateName}?`,
      message: 'Note that this action cannot be <strong>undone</strong>!',
      cssClass: 'homedThemeAlert',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'false-button',
          handler: () => { }
        }, {
          text: 'Delete',
          cssClass: 'delete-button',
          handler: () => {
            this.delete()
          }
        }
      ]
    });

    await alert.present();
  }

  async presentSubmitConfirm() {
    const alert = await this.alertController.create({
      header: `Confirm Submission of ${this.formInstance.formTemplateMapping.formTemplateName}?`,
      message: 'Note that this action cannot be <strong>undone</strong>!',
      cssClass: 'homedThemeAlert',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'false-button',
          handler: () => { }
        }, {
          text: 'Submit',
          cssClass: 'true-button',
          handler: () => {
            this.formService.submitFormInstance(this.formInstance).subscribe(
              response => {
                console.log(`submitted successfully`);
                this.dismiss()
              },
              error => {
                console.log(error);
              }
            )
          }
        }
      ]
    });

    await alert.present();
  }

  delete() {
    this.formService.deleteFormInstance(this.formInstance.formInstanceId).subscribe(
      response => {
        this.dismiss()
      }, error => {
        console.log(error)
        this.presentFailedToast(error.substring(37))
      }
    )
  }

  update(updateForm: NgForm) {
    if (updateForm.valid) {
      this.loadNgModels()

      this.formInstance.formInstanceFields.forEach(fif => {
        let newFormInstanceFieldValues = []
        fif.formInstanceFieldValues.forEach(fifv => {
          if (fifv.inputValue != null && fifv.inputValue != "") {
            newFormInstanceFieldValues.push(fifv)
          }
        })
        fif.formInstanceFieldValues = newFormInstanceFieldValues
      })

      this.formService.updateFormInstanceFieldValues(this.formInstance).subscribe(
        response => {
          this.dismiss()
        },
        error => {
          console.log(error)
          this.presentFailedToast(error.substring(37))
        }
      )
    }
  }

  submit(form: NgForm) {

    var formValidty = true

    this.formInstance.formInstanceFields.forEach(fif => {
      this.formInstanceErrorChips[fif.formInstanceFieldId] = false
    })

    if (form.valid) {
      this.loadNgModels()

      formInstanceFields: for (let fif of this.formInstance.formInstanceFields) {

        // checking for checkbox & multi_select input types
        if (fif.formInstanceFieldValues.length < 1 && fif.formFieldMapping.isServicemanEditable == true) {
          console.log(`${fif.formFieldMapping.question} not answered`);

          this.formInstanceErrorChips[fif.formInstanceFieldId] = true
          formValidty = false
          // break formInstanceFields
        }

        _: for (let fifv of fif.formInstanceFieldValues) {

          // checking for all other input types
          if (fif.formFieldMapping.isRequired == true && fifv.inputValue.length == 0 && fif.formFieldMapping.isServicemanEditable == true) {
            console.log(`${fif.formFieldMapping.question} not answered`);

            this.formInstanceErrorChips[fif.formInstanceFieldId] = true
            formValidty = false
            // break formInstanceFields
          }

        }

      }

      if (!this.declarationChecked && this.formInstance.formTemplateMapping.declaration != null) {
        this.declarationRequiredShow = true;
        formValidty = false
      } else {
        this.declarationRequiredShow = false;
      }

      if (formValidty == true) {
        this.presentSubmitConfirm()
      }
      else {
        this.formInstance.formInstanceFields.forEach((fif) => {
          // have to 'clean' the fifvs for checkbox, or the checkbox might have duplicate fields cause extra fifv was injected with isChecked
          if (fif.formFieldMapping.inputType == "CHECK_BOX") {
            for (var index = 0; fif.formInstanceFieldValues.length; index++) {
              if (fif.formInstanceFieldValues[index].isChecked == undefined) {
                fif.formInstanceFieldValues.splice(index, 1)
              }
            }
          }
        })
      }
    }
    else {
      console.log('Form failed ngForm validity check');
    }

  }

  async presentFailedToast(messageToDisplay: string) {
    const toast = await this.toastController.create({
      message: messageToDisplay,
      duration: 1500,
      color: "danger",
      position: "bottom"
    })
    toast.present()
  }

  singleDropdownOptions: any = {
    cssClass: 'activateAccountAlert'
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    })
  }

}