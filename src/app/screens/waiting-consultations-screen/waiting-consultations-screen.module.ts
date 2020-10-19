import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WaitingConsultationsScreenPageRoutingModule } from './waiting-consultations-screen-routing.module';

import { WaitingConsultationsScreenPage } from './waiting-consultations-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WaitingConsultationsScreenPageRoutingModule
  ],
  declarations: [WaitingConsultationsScreenPage]
})
export class WaitingConsultationsScreenPageModule {}
