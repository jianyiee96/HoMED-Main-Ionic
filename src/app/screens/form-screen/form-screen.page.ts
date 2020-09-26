import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormInstance } from 'src/app/classes/form-instance/form-instance';
import { FormService } from 'src/app/services/form/form.service';

@Component({
  selector: 'app-form-screen',
  templateUrl: './form-screen.page.html',
  styleUrls: ['./form-screen.page.scss'],
})
export class FormScreenPage implements OnInit {

  formInstances: FormInstance[]

  isShown: boolean

  constructor(
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

    this.formService.retrieveAllFormTemplates().subscribe(
      response => {
        this.formService.formTemplates = response.formTemplates
      },
      error => {
        console.log(error)
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

  redirectToFormRepo() {
    this.router.navigate(["/form-repository-screen"])
  }

}
