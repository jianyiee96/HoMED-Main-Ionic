import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController, ModalController, NavParams, PickerController } from '@ionic/angular';

import { FormFieldOption, FormTemplate } from 'src/app/classes/form-template/form-template';
import { FormService } from 'src/app/services/form/form.service';

@Component({
  selector: 'app-view-form-template-modal',
  templateUrl: './view-form-template-modal.page.html',
  styleUrls: ['./view-form-template-modal.page.scss'],
})
export class ViewFormTemplateModalPage implements OnInit {

  formTemplate: FormTemplate

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private navParam: NavParams,
    private pickerController: PickerController,
    private formService: FormService,
    private router: Router,
  ) {
    this.formTemplate = navParam.get("formTemplate")
  }

  ngOnInit() {
  }

  addToFormInstances() {

    this.formService.createFormInstance(this.formTemplate.formTemplateId).subscribe(
      response => {
        this.presentAlert("Form instance added")
      },
      error => {
        this.presentAlert("Failed to add form instance", error.substring(37))
      }
    )

  }

  async presentAlert(header: string, subHeader?: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: 'Tap Ok to be redirected to the forms screen.',
      cssClass: "activateAccountAlert",
      buttons: [
        {
          text: 'Ok',
          cssClass: 'activate-button',
          handler: () => {
            this.modalController.dismiss()
            this.router.navigate(["/form-screen"])
          }
        }
      ]
    });

    await alert.present();
  }

  async openPicker(options: FormFieldOption[]) {
    const picker = await this.pickerController.create({
      cssClass: 'activateAccountAlert',
      backdropDismiss: false,
      buttons: [{
        text: "Close",
        role: 'cancel'
      }],
      columns: [
        {
          name: 'options',
          options:
            this.getColumnOptions(options)
        },
      ]
    });
    await picker.present();
  }

  getColumnOptions(options: FormFieldOption[]) {
    let columnOptions = [];
    options.forEach(o => {
      columnOptions.push({ text: o.formFieldOptionValue })
    });
    return columnOptions;
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
