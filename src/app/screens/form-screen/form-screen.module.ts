import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormScreenPageRoutingModule } from './form-screen-routing.module';

import { FormScreenPage } from './form-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormScreenPageRoutingModule
  ],
  declarations: [FormScreenPage]
})
export class FormScreenPageModule {}
