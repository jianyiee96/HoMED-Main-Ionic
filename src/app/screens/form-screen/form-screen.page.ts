import { Component, NgZone, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { FormInstance } from 'src/app/classes/form-instance/form-instance';
import { EditFormInstanceModalPage } from 'src/app/modals/edit-form-instance-modal/edit-form-instance-modal.page';
import { FormService } from 'src/app/services/form/form.service';

@Component({
  selector: 'app-form-screen',
  templateUrl: './form-screen.page.html',
  styleUrls: ['./form-screen.page.scss'],
})
export class FormScreenPage implements OnInit {

  formInstances: FormInstance[] = []

  isShown: boolean

  constructor(
    private modalController: ModalController,
    private formService: FormService,
    private ngZone: NgZone,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.isShown = true

    this.formService.retrieveAllServicemanFormInstances().subscribe(
      response => {
        this.formInstances = response.formInstances
      },
      error => {
        console.error(error);
      }
    )

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

  async editFormInstance(formInstance: FormInstance) {
    const modal = await this.modalController.create({
      component: EditFormInstanceModalPage,
      componentProps: {
        formInstance: formInstance
      }
    });

    modal.onDidDismiss().then(() => {
      this.ionViewWillEnter()
    })
    return await modal.present();
  }
  
  redirectToFormRepo() {
    this.router.navigate(["/form-repository-screen"])
  }

}
