import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ModalController } from '@ionic/angular';

import { FormTemplate } from 'src/app/classes/form-template/form-template';
import { ViewFormTemplateModalPage } from 'src/app/modals/view-form-template-modal/view-form-template-modal.page';
import { FormService } from 'src/app/services/form/form.service';

@Component({
  selector: 'app-form-repository-screen',
  templateUrl: './form-repository-screen.page.html',
  styleUrls: ['./form-repository-screen.page.scss'],
})
export class FormRepositoryScreenPage implements OnInit {

  formTemplates: FormTemplate[]

  constructor(
    private formService: FormService,
    private modalController: ModalController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.formService.retrieveAllFormTemplates().subscribe(
      response => {
        this.formService.formTemplates = response.formTemplates

        this.formTemplates = this.formService.formTemplates
        this.formTemplates.forEach(ft => {
          ft.datePublished = this.convertUTCStringToSingaporeDate(ft.datePublished)
        })
      },
      error => {
        console.log(error)
      }
    )
  }

  async presentFormTemplate(formTemplate: FormTemplate) {
    const modal = await this.modalController.create({
      component: ViewFormTemplateModalPage,
      componentProps: {
        formTemplate: formTemplate
      }
    });
    return await modal.present();
  }

  redirectToFormScreen() {
    this.router.navigate(["/form-screen"])
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
