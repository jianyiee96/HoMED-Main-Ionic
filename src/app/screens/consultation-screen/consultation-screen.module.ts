import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultationScreenPageRoutingModule } from './consultation-screen-routing.module';

import { ConsultationScreenPage } from './consultation-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsultationScreenPageRoutingModule
  ],
  declarations: [ConsultationScreenPage]
})
export class ConsultationScreenPageModule {}
