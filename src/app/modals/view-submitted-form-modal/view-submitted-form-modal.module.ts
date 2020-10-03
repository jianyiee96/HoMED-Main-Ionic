import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewSubmittedFormModalPageRoutingModule } from './view-submitted-form-modal-routing.module';

import { ViewSubmittedFormModalPage } from './view-submitted-form-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewSubmittedFormModalPageRoutingModule
  ],
  declarations: [ViewSubmittedFormModalPage]
})
export class ViewSubmittedFormModalPageModule {}
