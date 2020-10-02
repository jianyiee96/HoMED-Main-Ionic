import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { FormInstance } from 'src/app/classes/form-instance/form-instance';

@Component({
  selector: 'app-view-submitted-form-modal',
  templateUrl: './view-submitted-form-modal.page.html',
  styleUrls: ['./view-submitted-form-modal.page.scss'],
})
export class ViewSubmittedFormModalPage implements OnInit {

  formInstance: FormInstance

  constructor(
    private navParam: NavParams
  ) { 
    this.formInstance = navParam.get("formInstance")
    this.formInstance.formInstanceFields.sort((x, y) => (x.formFieldMapping.position - y.formFieldMapping.position))
  }

  ngOnInit() {
  }

}
