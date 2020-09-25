import { Component, OnInit } from '@angular/core';

import { ModalController, NavParams, PickerController } from '@ionic/angular';

import { FormFieldOption, FormTemplate } from 'src/app/classes/form-template/form-template';

@Component({
  selector: 'app-view-form-template-modal',
  templateUrl: './view-form-template-modal.page.html',
  styleUrls: ['./view-form-template-modal.page.scss'],
})
export class ViewFormTemplateModalPage implements OnInit {

  formTemplate: FormTemplate

  constructor(
    private modalController: ModalController,
    private navParam: NavParams,
    private pickerController: PickerController,
  ) {
    this.formTemplate = navParam.get("formTemplate")
    this.formTemplate.formFields.sort((x, y) => (x.position - y.position))
  }

  ngOnInit() {
  }

  async openPicker(options: FormFieldOption[]) {
    const picker = await this.pickerController.create({
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
