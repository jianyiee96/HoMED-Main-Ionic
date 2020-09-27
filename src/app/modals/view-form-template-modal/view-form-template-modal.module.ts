import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewFormTemplateModalPageRoutingModule } from './view-form-template-modal-routing.module';

import { ViewFormTemplateModalPage } from './view-form-template-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewFormTemplateModalPageRoutingModule
  ],
  declarations: [ViewFormTemplateModalPage]
})
export class ViewFormTemplateModalPageModule {}
