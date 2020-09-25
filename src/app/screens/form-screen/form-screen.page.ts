import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormService } from 'src/app/services/form/form.service';

@Component({
  selector: 'app-form-screen',
  templateUrl: './form-screen.page.html',
  styleUrls: ['./form-screen.page.scss'],
})
export class FormScreenPage implements OnInit {

  constructor(
    private formService: FormService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.formService.retrieveAllFormTemplates().subscribe(
      response => {
        this.formService.formTemplates = response.formTemplates
      },
      error => {
        console.log(error)
      }
    )
  }

  redirectToFormRepo() {
    this.router.navigate(["/form-repository-screen"])
  }

}
