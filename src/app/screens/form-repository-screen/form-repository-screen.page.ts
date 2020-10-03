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
          ft.datePublished = this.parseDate(ft.datePublished).substring(0, 10)
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

  parseDate(date: any) {
    return date.toString().replace('[UTC]', '');
  }

}
